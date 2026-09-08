import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';
import { walk } from './lib/fs.mjs';
import { buildFreshnessReport } from './lib/freshness-report.mjs';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content', 'docs');
const ignored = new Set(['.git', '.astro', 'dist', 'node_modules']);
const config = JSON.parse(
  fs.readFileSync(path.join(root, 'config', 'freshness-report.json'), 'utf8')
);

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
    lastReviewed: data.lastReviewed,
    path: toPosix(path.relative(root, file)),
  };
}

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const asOf = argumentValue('--as-of') ?? new Date().toISOString().slice(0, 10);
const files = walk(contentRoot, { ignored })
  .filter((file) => file.endsWith('.md'))
  .sort((left, right) => left.localeCompare(right));
const report = buildFreshnessReport(files.map(parseEntry), {
  asOf,
  thresholdDays: config.thresholdDays,
});

if (process.argv.includes('--json')) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  console.log(`Content freshness as of ${report.asOf}`);
  console.log(`Thresholds: ${report.thresholdDays.join(', ')} days`);
  console.log(`Eligible reviewed/stable entries: ${report.eligibleCount}`);
  console.log(`Entries with valid review dates: ${report.datedCount}`);
  console.log(`Missing required review dates: ${report.missingRequiredReviewDates.length}`);
  console.log(`Invalid review dates: ${report.invalidReviewDates.length}`);

  console.log('\nAge buckets:');
  for (const bucket of report.ageBuckets) {
    console.log(`- ${bucket.label}: ${bucket.count}`);
  }

  console.log('\nThreshold exceedance:');
  for (const threshold of report.thresholds) {
    console.log(`- older than ${threshold.thresholdDays} days: ${threshold.count}`);
  }

  console.log('\nOldest entries:');
  for (const item of report.oldestEntries.slice(0, 20)) {
    console.log(`- ${item.ageDays}d | ${item.id} | ${item.lastReviewed} | ${item.path}`);
  }

  if (report.missingRequiredReviewDates.length > 0) {
    console.log('\nMissing required review dates:');
    for (const item of report.missingRequiredReviewDates) console.log(`- ${item.id} | ${item.path}`);
  }

  if (report.invalidReviewDates.length > 0) {
    console.log('\nInvalid review dates:');
    for (const item of report.invalidReviewDates) console.log(`- ${item.id} | ${item.path}`);
  }

  console.log('\nCategory summary:');
  for (const category of report.categories) {
    console.log(`- ${category.category}: ${category.datedCount}/${category.eligibleCount} dated, oldest ${category.oldestAgeDays ?? 'n/a'}d`);
  }

  console.log('\nInformational only. Age does not fail normal PR CI and review dates must not be changed without reviewing the content.');
}
