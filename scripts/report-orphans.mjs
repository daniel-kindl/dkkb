import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';
import { walk } from './lib/fs.mjs';
import {
  deriveKnowledgeGraph,
  findKnowledgeOrphans,
} from '../src/lib/knowledge-graph-core.mjs';

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
    description: data.description ?? '',
    type: data.type,
    status: data.status,
    hidden: data.sidebar?.hidden === true,
    system: Array.isArray(data.topics) && data.topics.includes('system-page'),
    related: Array.isArray(data.related) ? data.related : [],
    path: toPosix(path.relative(root, file)),
    markdown,
  };
}

const files = walk(contentRoot, { ignored })
  .filter((file) => file.endsWith('.md'))
  .sort((left, right) => left.localeCompare(right));
const entries = files.map(parseEntry);
const graph = deriveKnowledgeGraph(entries);
const orphans = findKnowledgeOrphans(entries);
const report = {
  eligibleEntries: graph.nodes.length,
  relationships: graph.edges.length,
  orphanCount: orphans.length,
  orphans,
};

if (process.argv.includes('--json')) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  console.log(`Knowledge graph: ${report.eligibleEntries} reviewed/stable entries, ${report.relationships} relationships.`);
  console.log(`Orphans: ${report.orphanCount}`);

  for (const orphan of orphans) {
    console.log(`- ${orphan.id}: ${orphan.title} (${orphan.path})`);
  }

  console.log('Informational only. Repair an orphan with an authored Markdown link or a meaningful related relationship.');
}
