import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';
import { walk } from './lib/fs.mjs';
import { auditSourceQuality } from './lib/source-audit.mjs';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content', 'docs');
const ignored = new Set(['.git', '.astro', 'dist', 'node_modules']);

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function contentId(file) {
  const relative = toPosix(path.relative(contentRoot, file));
  const withoutExtension = relative.replace(/\.md$/, '');
  if (withoutExtension === 'index') return 'index';
  return withoutExtension.endsWith('/index')
    ? withoutExtension.slice(0, -'/index'.length)
    : withoutExtension;
}

function parseEntry(file) {
  const markdown = fs.readFileSync(file, 'utf8');
  const frontmatter = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) throw new Error(`${toPosix(path.relative(root, file))}: missing YAML frontmatter.`);

  const data = YAML.parse(frontmatter[1]);
  return {
    id: contentId(file),
    title: data.title ?? contentId(file),
    type: data.type,
    status: data.status,
    confidence: data.confidence,
    provenance: Array.isArray(data.provenance) ? data.provenance : [],
    sources: Array.isArray(data.sources) ? data.sources : [],
    path: toPosix(path.relative(root, file)),
  };
}

const files = walk(contentRoot, { ignored })
  .filter((file) => file.endsWith('.md'))
  .sort((left, right) => left.localeCompare(right));
const report = auditSourceQuality(files.map(parseEntry));

if (process.argv.includes('--json')) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  console.log(`Source audit: ${report.eligibleCount} reviewed/stable non-index entries.`);
  console.log(`Deterministic metadata findings: ${report.deterministicFindingCount}`);
  console.log(`Editorial review queue: ${report.reviewQueueCount}`);

  if (report.deterministicFindings.length > 0) {
    console.log('\nDeterministic metadata findings:');
    for (const item of report.deterministicFindings) {
      console.log(`- ${item.id} | ${item.kind} | ${item.message} | ${item.path}`);
    }
  }

  if (report.reviewQueue.length > 0) {
    console.log('\nEditorial review queue:');
    for (const item of report.reviewQueue) {
      console.log(`- ${item.id} | ${item.kind} | ${item.message} | ${item.path}`);
    }
  }

  console.log('\nInformational audit only. Source count is not a quality score; semantic findings require human review before content changes.');
}
