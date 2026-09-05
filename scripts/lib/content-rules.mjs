// Composable content rule-checkers for the DKKB validation CLI. Each checker is a
// pure-ish function that returns `{ errors, warnings }` instead of mutating shared
// state, so the runner (scripts/validate-content.mjs) composes them by concatenation
// and each rule is testable on its own. See docs/adr and issue #82 for the split.

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';
import { toPosixPath } from './fs.mjs';
import { checkHomepageEligibility } from '../../src/lib/homepage-eligibility.mjs';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content', 'docs');

function rel(file) {
  return toPosixPath(path.relative(root, file));
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

function localTargetExists(file, target) {
  const resolved = path.resolve(path.dirname(file), target);
  const candidates = [resolved];
  const withoutTrailingSlash = target.replace(/\/+$/, '');

  if (withoutTrailingSlash && !path.extname(withoutTrailingSlash)) {
    const routeTarget = path.resolve(path.dirname(file), withoutTrailingSlash);
    candidates.push(`${routeTarget}.md`, path.join(routeTarget, 'index.md'));
  }

  return candidates.some((candidate) => fs.existsSync(candidate));
}

/**
 * Repo-wide prose rules: the MDX ban plus forbidden characters and filler phrases.
 * Reads files itself and filters `.mdx` vs `.md` internally, mirroring the runner today.
 */
export function checkProseRules(files, rules) {
  const errors = [];

  for (const file of files.filter((f) => f.endsWith('.mdx'))) {
    errors.push(`${rel(file)}: MDX is not allowed. Use Markdown.`);
  }

  for (const file of files.filter((f) => f.endsWith('.md'))) {
    const content = fs.readFileSync(file, 'utf8');
    const prose = stripCode(content);
    for (const character of rules.forbiddenCharacters) {
      if (prose.includes(character)) errors.push(`${rel(file)}: forbidden character '${character}' found in prose.`);
    }
    const lower = prose.toLowerCase();
    for (const phrase of rules.forbiddenPhrases) {
      if (lower.includes(phrase.toLowerCase())) errors.push(`${rel(file)}: forbidden filler phrase '${phrase}' found in prose.`);
    }
  }

  return { errors, warnings: [] };
}

/**
 * Broken local-link detection. Reads files itself. Split out of prose rules because
 * it is I/O-bound existence checking, not `rules`-driven text matching.
 */
export function checkLinks(files) {
  const errors = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
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
      if (!localTargetExists(file, decoded)) {
        errors.push(`${rel(file)}: broken local link '${raw}'.`);
      }
    }
  }

  return { errors, warnings: [] };
}

/**
 * Per-entry frontmatter and schema rules. Short-circuits when frontmatter is missing
 * or unparseable: only that one error, `entry: null`, and every other data-dependent
 * check is skipped. The filename kebab-case check still runs regardless.
 */
export function checkEntry(file, content) {
  const errors = [];
  const warnings = [];

  const name = path.basename(file, '.md');
  if (name !== 'index' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    errors.push(`${rel(file)}: file names must use lowercase kebab-case.`);
  }

  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    errors.push(`${rel(file)}: missing YAML frontmatter.`);
    return { errors, warnings, entry: null };
  }

  let data;
  try {
    data = YAML.parse(match[1]);
  } catch (error) {
    errors.push(`${rel(file)}: invalid YAML frontmatter: ${error.message}`);
    return { errors, warnings, entry: null };
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

  // A reviewed or stable entry carries a review-freshness claim. Homepage promotion
  // and readers both rely on 'lastReviewed' to judge whether that claim is current.
  // Index pages are generated overviews, not reviewed knowledge, so they are exempt.
  if (data?.type !== 'index' && ['reviewed', 'stable'].includes(data?.status) && !data?.lastReviewed) {
    errors.push(`${rel(file)}: status '${data?.status}' entries must define 'lastReviewed'.`);
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

  if (data?.homepage !== undefined) {
    const homepage = data.homepage;
    if (homepage === null || typeof homepage !== 'object' || Array.isArray(homepage)) {
      errors.push(`${rel(file)}: 'homepage' must be a metadata object.`);
    } else {
      const isPromoted = homepage.startHere === true || homepage.featured === true;
      if (!isPromoted) {
        errors.push(`${rel(file)}: 'homepage' must enable 'startHere' or 'featured'.`);
      }
      if (homepage.order !== undefined && (!Number.isInteger(homepage.order) || homepage.order < 0)) {
        errors.push(`${rel(file)}: 'homepage.order' must be a non-negative integer.`);
      }
      if (isPromoted) {
        const messages = {
          type: `${rel(file)}: index entries must not use homepage promotion metadata.`,
          status: `${rel(file)}: only reviewed or stable entries can be promoted on the homepage.`,
          hidden: `${rel(file)}: hidden entries must not be promoted on the homepage.`,
        };
        for (const violation of checkHomepageEligibility(data).violations) {
          errors.push(messages[violation]);
        }
      }
    }
  }

  if (data?.type === 'index' && id !== 'index' && /^## Entries\s*$/m.test(body)) {
    errors.push(`${rel(file)}: category entry lists are generated from the content collection.`);
  }

  if (/^## Related knowledge\s*$/m.test(body)) {
    errors.push(`${rel(file)}: related knowledge is generated from 'related' frontmatter.`);
  }

  for (const line of body.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('|')) continue;
    if (trimmed.split(/\s+/).length > 35) {
      warnings.push(`${rel(file)}: prose line exceeds 35 words. Review for clarity.`);
    }
  }

  return { errors, warnings, entry: { id, file, data } };
}

/**
 * Cross-entry checks against the raw, non-deduplicated entry list (checkEntry can
 * produce duplicate ids). Detects duplicate ids (group-by-id, first-wins) and checks
 * each entry's `related` field for existence, self-reference, and in-entry duplicates
 * against the first-wins lookup, matching the runner's semantics today.
 */
export function checkReferentialIntegrity(entries) {
  const errors = [];
  const byId = new Map();

  for (const entry of entries) {
    if (byId.has(entry.id)) {
      errors.push(`${rel(entry.file)}: duplicate canonical content ID '${entry.id}'.`);
    } else {
      byId.set(entry.id, entry);
    }
  }

  for (const [id, entry] of byId) {
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
      if (!byId.has(relatedId)) {
        errors.push(`${rel(entry.file)}: related content ID '${relatedId}' does not exist.`);
      }
    }
  }

  return { errors, warnings: [] };
}
