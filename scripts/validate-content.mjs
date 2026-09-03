import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content', 'docs');
const ignored = new Set(['.git', '.astro', 'dist', 'node_modules']);
const rules = JSON.parse(fs.readFileSync(path.join(root, 'config', 'style-rules.json'), 'utf8'));
const errors = [];
const warnings = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignored.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function rel(file) {
  return path.relative(root, file).split(path.sep).join('/');
}

function stripCode(text) {
  return text.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '').replace(/`[^`\n]+`/g, '');
}

function contentId(file) {
  const relative = path.relative(contentRoot, file).split(path.sep).join('/');
  const withoutExtension = relative.replace(/\.md$/, '');
  if (withoutExtension === 'index') return 'index';
  return withoutExtension.endsWith('/index') ? withoutExtension.slice(0, -'/index'.length) : withoutExtension;
}

function checkLinks(file, content) {
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const raw = match[1].trim().replace(/^<|>$/g, '');
    if (!raw || raw.startsWith('#') || raw.startsWith('/') || /^[a-z][a-z0-9+.-]*:/i.test(raw)) continue;
    const target = raw.split('#', 1)[0].split('?', 1)[0];
    if (!target) continue;
    let decoded;
    try {
      decoded = decodeURIComponent(target);
    } catch {
      errors.push(`${rel(file)}: invalid encoded link '${raw}'.`);
      continue;
    }
    if (!fs.existsSync(path.resolve(path.dirname(file), decoded))) {
      errors.push(`${rel(file)}: broken local link '${raw}'.`);
    }
  }
}

const repositoryFiles = walk(root);
for (const file of repositoryFiles.filter((f) => f.endsWith('.mdx'))) {
  errors.push(`${rel(file)}: MDX is not allowed. Use Markdown.`);
}

for (const file of repositoryFiles.filter((f) => f.endsWith('.md'))) {
  const content = fs.readFileSync(file, 'utf8');
  checkLinks(file, content);
  const prose = stripCode(content);
  for (const character of rules.forbiddenCharacters) {
    if (prose.includes(character)) errors.push(`${rel(file)}: forbidden character '${character}' found in prose.`);
  }
  const lower = prose.toLowerCase();
  for (const phrase of rules.forbiddenPhrases) {
    if (lower.includes(phrase.toLowerCase())) errors.push(`${rel(file)}: forbidden filler phrase '${phrase}' found in prose.`);
  }
}

const contentFiles = walk(contentRoot).filter((f) => f.endsWith('.md'));
const entries = new Map();

for (const file of contentFiles) {
  const name = path.basename(file, '.md');
  if (name !== 'index' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    errors.push(`${rel(file)}: file names must use lowercase kebab-case.`);
  }

  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    errors.push(`${rel(file)}: missing YAML frontmatter.`);
    continue;
  }

  let data;
  try {
    data = YAML.parse(match[1]);
  } catch (error) {
    errors.push(`${rel(file)}: invalid YAML frontmatter: ${error.message}`);
    continue;
  }

  for (const field of ['title', 'description', 'type', 'status', 'provenance']) {
    if (data?.[field] === undefined || data?.[field] === null || data?.[field] === '') {
      errors.push(`${rel(file)}: missing required frontmatter field '${field}'.`);
    }
  }

  if (!Array.isArray(data?.provenance) || data.provenance.length === 0) {
    errors.push(`${rel(file)}: 'provenance' must contain at least one value.`);
  }

  if (data?.related !== undefined && !Array.isArray(data.related)) {
    errors.push(`${rel(file)}: 'related' must be an array of canonical content IDs.`);
  }

  const body = stripCode(content.slice(match[0].length));
  const h1Headings = [...body.matchAll(/^# (.+)$/gm)].map((heading) => heading[1].trim());
  const hasSplashHeroTitle =
    data?.template === 'splash' &&
    typeof data?.hero?.title === 'string' &&
    data.hero.title.trim().length > 0;

  if (hasSplashHeroTitle) {
    if (h1Headings.length !== 0) {
      errors.push(`${rel(file)}: splash entries with a hero title must not contain a Markdown H1.`);
    }
  } else if (h1Headings.length !== 1) {
    errors.push(`${rel(file)}: canonical entries must contain exactly one Markdown H1.`);
  } else if (h1Headings[0] !== data?.title) {
    errors.push(`${rel(file)}: Markdown H1 must match the frontmatter title exactly.`);
  }

  const id = contentId(file);
  if (entries.has(id)) {
    errors.push(`${rel(file)}: duplicate canonical content ID '${id}'.`);
  } else {
    entries.set(id, { file, data });
  }

  for (const line of body.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('|')) continue;
    if (trimmed.split(/\s+/).length > 35) {
      warnings.push(`${rel(file)}: prose line exceeds 35 words. Review for clarity.`);
    }
  }
}

for (const [id, entry] of entries) {
  if (!Array.isArray(entry.data?.related)) continue;
  const seen = new Set();
  for (const relatedId of entry.data.related) {
    if (typeof relatedId !== 'string' || relatedId.length === 0) {
      errors.push(`${rel(entry.file)}: each 'related' value must be a non-empty canonical content ID.`);
      continue;
    }
    if (relatedId === id) {
      errors.push(`${rel(entry.file)}: 'related' must not reference the entry itself ('${id}').`);
    }
    if (seen.has(relatedId)) {
      errors.push(`${rel(entry.file)}: duplicate related content ID '${relatedId}'.`);
    }
    seen.add(relatedId);
    if (!entries.has(relatedId)) {
      errors.push(`${rel(entry.file)}: related content ID '${relatedId}' does not exist.`);
    }
  }
}

if (warnings.length) {
  console.warn('Content warnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error('Content validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Content validation passed.');
