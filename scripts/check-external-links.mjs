import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { walk } from './lib/fs.mjs';
import {
  checkExternalUrl,
  exclusionReason,
  extractExternalReferences,
  isConfirmedFailure,
  mapWithConcurrency,
  summarizeExternalResults,
} from './lib/external-links.mjs';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content', 'docs');
const config = JSON.parse(fs.readFileSync(path.join(root, 'config', 'external-links.json'), 'utf8'));
const args = new Set(process.argv.slice(2));
const jsonOutput = args.has('--json');
const failOnConfirmed = args.has('--fail-on-confirmed');

const files = walk(contentRoot, { ignored: new Set(['.git', '.astro', 'dist', 'node_modules']) })
  .filter((file) => file.endsWith('.md'))
  .sort((left, right) => left.localeCompare(right));

const references = files.flatMap((file) => {
  const relative = path.relative(root, file).split(path.sep).join('/');
  return extractExternalReferences(relative, fs.readFileSync(file, 'utf8'));
});

const excluded = [];
const candidates = [];
for (const reference of references) {
  const reason = exclusionReason(reference.url, config);
  if (reason) {
    excluded.push({ ...reference, status: 'excluded', reason, attempts: 0, persistent: false });
  } else {
    candidates.push(reference);
  }
}

const checked = await mapWithConcurrency(
  candidates,
  config.concurrency,
  (reference) => checkExternalUrl(reference, config)
);
const report = summarizeExternalResults([...excluded, ...checked]);

if (jsonOutput) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  console.log(`External references: ${report.checked} checked, ${report.excluded} excluded.`);
  for (const [status, count] of Object.entries(report.counts)) console.log(`- ${status}: ${count}`);
  for (const result of report.results.filter((item) => item.status !== 'ok')) {
    const detail = result.httpStatus ? ` HTTP ${result.httpStatus}` : '';
    const persistence = result.persistent ? ' persistent' : '';
    console.log(`- ${result.status}${detail}${persistence}: ${result.file} -> ${result.url}`);
  }
}

if (failOnConfirmed && report.results.some(isConfirmedFailure)) process.exitCode = 1;
