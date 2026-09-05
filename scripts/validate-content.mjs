import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { walk } from './lib/fs.mjs';
import {
  checkProseRules,
  checkLinks,
  checkEntry,
  checkReferentialIntegrity,
} from './lib/content-rules.mjs';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content', 'docs');
const ignored = new Set(['.git', '.astro', 'dist', 'node_modules']);
const rules = JSON.parse(fs.readFileSync(path.join(root, 'config', 'style-rules.json'), 'utf8'));

const errors = [];
const warnings = [];

function merge(result) {
  errors.push(...result.errors);
  warnings.push(...result.warnings);
}

const repositoryFiles = walk(root, { ignored });
merge(checkProseRules(repositoryFiles, rules));
merge(checkLinks(repositoryFiles.filter((f) => f.endsWith('.md'))));

const contentFiles = walk(contentRoot, { ignored }).filter((f) => f.endsWith('.md'));
const entries = [];
for (const file of contentFiles) {
  const result = checkEntry(file, fs.readFileSync(file, 'utf8'));
  merge(result);
  if (result.entry) entries.push(result.entry);
}

merge(checkReferentialIntegrity(entries));

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
