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
function rel(file) { return path.relative(root, file).split(path.sep).join('/'); }
function stripCode(text) { return text.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '').replace(/`[^`\n]+`/g, ''); }
function checkLinks(file, content) {
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const raw = match[1].trim().replace(/^<|>$/g, '');
    if (!raw || raw.startsWith('#') || raw.startsWith('/') || /^[a-z][a-z0-9+.-]*:/i.test(raw)) continue;
    const target = raw.split('#', 1)[0].split('?', 1)[0];
    if (!target) continue;
    let decoded;
    try { decoded = decodeURIComponent(target); } catch { errors.push(`${rel(file)}: invalid encoded link '${raw}'.`); continue; }
    if (!fs.existsSync(path.resolve(path.dirname(file), decoded))) errors.push(`${rel(file)}: broken local link '${raw}'.`);
  }
}

const repositoryFiles = walk(root);
for (const file of repositoryFiles.filter((f) => f.endsWith('.mdx'))) errors.push(`${rel(file)}: MDX is not allowed. Use Markdown.`);
for (const file of repositoryFiles.filter((f) => f.endsWith('.md'))) {
  const content = fs.readFileSync(file, 'utf8');
  checkLinks(file, content);
  const prose = stripCode(content);
  for (const character of rules.forbiddenCharacters) if (prose.includes(character)) errors.push(`${rel(file)}: forbidden character '${character}' found in prose.`);
  const lower = prose.toLowerCase();
  for (const phrase of rules.forbiddenPhrases) if (lower.includes(phrase.toLowerCase())) errors.push(`${rel(file)}: forbidden filler phrase '${phrase}' found in prose.`);
}
for (const file of walk(contentRoot).filter((f) => f.endsWith('.md'))) {
  const name = path.basename(file, '.md');
  if (name !== 'index' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) errors.push(`${rel(file)}: file names must use lowercase kebab-case.`);
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) { errors.push(`${rel(file)}: missing YAML frontmatter.`); continue; }
  let data;
  try { data = YAML.parse(match[1]); } catch (error) { errors.push(`${rel(file)}: invalid YAML frontmatter: ${error.message}`); continue; }
  for (const field of ['title','description','type','status','provenance']) if (data?.[field] === undefined || data?.[field] === null || data?.[field] === '') errors.push(`${rel(file)}: missing required frontmatter field '${field}'.`);
  if (!Array.isArray(data?.provenance) || data.provenance.length === 0) errors.push(`${rel(file)}: 'provenance' must contain at least one value.`);
  for (const line of stripCode(content.slice(match[0].length)).split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('|')) continue;
    if (trimmed.split(/\s+/).length > 35) warnings.push(`${rel(file)}: prose line exceeds 35 words. Review for clarity.`);
  }
}
if (warnings.length) { console.warn('Content warnings:'); for (const warning of warnings) console.warn(`- ${warning}`); }
if (errors.length) { console.error('Content validation failed:'); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log('Content validation passed.');
