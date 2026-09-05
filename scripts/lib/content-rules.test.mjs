import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import {
  checkProseRules,
  checkLinks,
  checkEntry,
  checkReferentialIntegrity,
} from './content-rules.mjs';

// checkEntry never reads the file; it takes content directly and uses the path only
// for path-relative reporting and id derivation. So entry-path fixtures point at the
// real content root without any file having to exist on disk.
const contentRoot = path.join(process.cwd(), 'src', 'content', 'docs');
const entryPath = (relative) => path.join(contentRoot, relative);

// A frontmatter block that passes every per-entry rule, so each test can flip one
// field and assert on the single rule under test.
function frontmatter(overrides = {}) {
  const data = {
    title: 'Example',
    description: 'An example entry.',
    type: 'concept',
    status: 'draft',
    provenance: ['derived-guidance'],
    ...overrides,
  };
  const lines = Object.entries(data).map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
  return `---\n${lines.join('\n')}\n---\n`;
}

const entryContent = (overrides, body = '# Example\n') => `${frontmatter(overrides)}${body}`;

describe('checkProseRules', () => {
  let dir;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'prose-'));
  });
  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  const rules = { forbiddenCharacters: ['—'], forbiddenPhrases: ['delve into'] };

  it('bans .mdx files', () => {
    const file = path.join(dir, 'note.mdx');
    fs.writeFileSync(file, 'anything');
    const { errors, warnings } = checkProseRules([file], rules);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('MDX is not allowed');
    expect(warnings).toEqual([]);
  });

  it('flags forbidden characters and phrases in prose', () => {
    const file = path.join(dir, 'note.md');
    fs.writeFileSync(file, 'We should delve into this — now.');
    const { errors } = checkProseRules([file], rules);
    expect(errors.some((e) => e.includes("forbidden character '—'"))).toBe(true);
    expect(errors.some((e) => e.includes("forbidden filler phrase 'delve into'"))).toBe(true);
  });

  it('ignores forbidden tokens inside fenced or inline code', () => {
    const file = path.join(dir, 'note.md');
    fs.writeFileSync(file, '```\ndelve into\n```\n\n`a — b`\n');
    const { errors } = checkProseRules([file], rules);
    expect(errors).toEqual([]);
  });
});

describe('checkLinks', () => {
  let dir;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'links-'));
  });
  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('reports a broken local link and accepts an existing target', () => {
    fs.writeFileSync(path.join(dir, 'target.md'), '# Target\n');
    const file = path.join(dir, 'source.md');
    fs.writeFileSync(file, '[ok](./target.md) and [bad](./missing.md)\n');
    const { errors, warnings } = checkLinks([file]);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("broken local link './missing.md'");
    expect(warnings).toEqual([]);
  });

  it('skips anchors, absolute paths, and external schemes', () => {
    const file = path.join(dir, 'source.md');
    fs.writeFileSync(file, '[a](#top) [b](/abs) [c](https://example.com)\n');
    expect(checkLinks([file]).errors).toEqual([]);
  });

  it('reports an invalid percent-encoded link', () => {
    const file = path.join(dir, 'source.md');
    fs.writeFileSync(file, '[bad](./%E0%A4%A.md)\n');
    const { errors } = checkLinks([file]);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('invalid encoded link');
  });
});

describe('checkEntry', () => {
  it('returns an entry with id and data for a valid file', () => {
    const { errors, entry } = checkEntry(entryPath('coding/naming.md'), entryContent());
    expect(errors).toEqual([]);
    expect(entry).toEqual({
      id: 'coding/naming',
      file: entryPath('coding/naming.md'),
      data: expect.objectContaining({ title: 'Example' }),
    });
  });

  it('short-circuits on missing frontmatter but still checks the filename', () => {
    const { errors, entry } = checkEntry(entryPath('Bad_Name.md'), 'no frontmatter here');
    expect(entry).toBeNull();
    expect(errors).toContain(`src/content/docs/Bad_Name.md: file names must use lowercase kebab-case.`);
    expect(errors).toContain(`src/content/docs/Bad_Name.md: missing YAML frontmatter.`);
    // No data-dependent rule ran.
    expect(errors.some((e) => e.includes('required frontmatter field'))).toBe(false);
  });

  it('reports missing required fields', () => {
    const content = `---\ntitle: Example\n---\n# Example\n`;
    const { errors } = checkEntry(entryPath('thing.md'), content);
    for (const field of ['description', 'type', 'status', 'provenance']) {
      expect(errors.some((e) => e.includes(`missing required frontmatter field '${field}'`))).toBe(true);
    }
  });

  it('requires lastReviewed for reviewed or stable entries', () => {
    const { errors } = checkEntry(entryPath('thing.md'), entryContent({ status: 'reviewed' }));
    expect(errors.some((e) => e.includes("status 'reviewed' entries must define 'lastReviewed'"))).toBe(true);
  });

  it('requires exactly one H1 matching the title', () => {
    const { errors } = checkEntry(entryPath('thing.md'), entryContent({}, '# Wrong Title\n'));
    expect(errors.some((e) => e.includes('Markdown H1 must match the frontmatter title'))).toBe(true);
  });

  it('validates homepage promotion shape', () => {
    const { errors } = checkEntry(
      entryPath('thing.md'),
      entryContent({ homepage: { order: -1 } })
    );
    expect(errors.some((e) => e.includes("'homepage' must enable 'startHere' or 'featured'"))).toBe(true);
    expect(errors.some((e) => e.includes("'homepage.order' must be a non-negative integer"))).toBe(true);
  });

  it('maps eligibility violations for promoted entries', () => {
    const { errors } = checkEntry(
      entryPath('thing.md'),
      entryContent({ type: 'index', status: 'draft', sidebar: { hidden: true }, homepage: { featured: true } })
    );
    expect(errors).toContain(`src/content/docs/thing.md: index entries must not use homepage promotion metadata.`);
    expect(errors).toContain(`src/content/docs/thing.md: only reviewed or stable entries can be promoted on the homepage.`);
    expect(errors).toContain(`src/content/docs/thing.md: hidden entries must not be promoted on the homepage.`);
  });

  it('does not run eligibility checks when homepage does not request promotion', () => {
    const { errors } = checkEntry(
      entryPath('thing.md'),
      entryContent({ type: 'index', status: 'draft', homepage: {} }, '')
    );
    expect(errors.some((e) => e.includes('can be promoted on the homepage'))).toBe(false);
  });
});

describe('checkReferentialIntegrity', () => {
  const entry = (id, related) => ({ id, file: entryPath(`${id}.md`), data: { related } });

  it('detects duplicate ids (first wins)', () => {
    const { errors } = checkReferentialIntegrity([entry('a'), entry('a'), entry('b')]);
    expect(errors).toEqual([`src/content/docs/a.md: duplicate canonical content ID 'a'.`]);
  });

  it('flags missing, self, and duplicated related ids', () => {
    const entries = [entry('a', ['b', 'a', 'missing', 'b']), entry('b', [])];
    const { errors } = checkReferentialIntegrity(entries);
    expect(errors).toContain(`src/content/docs/a.md: 'related' must not reference the entry itself ('a').`);
    expect(errors).toContain(`src/content/docs/a.md: duplicate related content ID 'b'.`);
    expect(errors).toContain(`src/content/docs/a.md: related content ID 'missing' does not exist.`);
  });

  it('rejects non-string related values', () => {
    const { errors } = checkReferentialIntegrity([entry('a', [''])]);
    expect(errors).toContain(`src/content/docs/a.md: each 'related' value must be a non-empty canonical content ID.`);
  });

  it('passes clean for a valid related graph', () => {
    const entries = [entry('a', ['b']), entry('b', ['a'])];
    expect(checkReferentialIntegrity(entries)).toEqual({ errors: [], warnings: [] });
  });
});
