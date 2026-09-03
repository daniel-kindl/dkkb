import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const distRoot = path.join(root, 'dist');
const siteConfig = JSON.parse(
  fs.readFileSync(path.join(root, 'config', 'site.json'), 'utf8')
);
const errors = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function slash(value) {
  return value.split(path.sep).join('/');
}

function normalizeBase(base) {
  const trimmed = String(base ?? '').trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

function pagePath(file, basePath) {
  const relative = slash(path.relative(distRoot, file));
  if (relative === 'index.html') return basePath;
  if (relative.endsWith('/index.html')) {
    return `${basePath}${relative.slice(0, -'index.html'.length)}`;
  }
  return `${basePath}${relative}`;
}

function existingTarget(pathname, basePath) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const relative = decoded.slice(basePath.length).replace(/^\/+/, '');
  const direct = path.join(distRoot, relative);
  const candidates = [];

  if (!relative) {
    candidates.push(path.join(distRoot, 'index.html'));
  } else if (decoded.endsWith('/')) {
    candidates.push(path.join(direct, 'index.html'));
  } else {
    candidates.push(direct, `${direct}.html`, path.join(direct, 'index.html'));
  }

  return candidates.find((candidate) => {
    try {
      return fs.statSync(candidate).isFile();
    } catch {
      return false;
    }
  }) ?? null;
}

function htmlIds(file) {
  const html = fs.readFileSync(file, 'utf8');
  const ids = new Set();
  for (const match of html.matchAll(/\b(?:id|name)=(['"])(.*?)\1/gi)) {
    ids.add(match[2]);
  }
  return ids;
}

if (!fs.existsSync(distRoot)) {
  console.error('Built link validation failed: dist/ does not exist. Run the build first.');
  process.exit(1);
}

const basePath = normalizeBase(siteConfig.base);
const deploymentUrl = new URL(basePath, siteConfig.site);
const htmlFiles = walk(distRoot).filter((file) => file.endsWith('.html'));
const idCache = new Map();
let checkedLinks = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const sourceUrl = new URL(pagePath(file, basePath), deploymentUrl.origin);

  for (const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*(['"])(.*?)\1/gi)) {
    const href = match[2].trim();
    if (!href || href === '#') continue;
    if (/^(?:mailto|tel|javascript|data):/i.test(href)) continue;

    let targetUrl;
    try {
      targetUrl = new URL(href, sourceUrl);
    } catch {
      errors.push(`${slash(path.relative(root, file))}: invalid href '${href}'.`);
      continue;
    }

    if (targetUrl.origin !== deploymentUrl.origin) continue;
    checkedLinks += 1;

    if (!targetUrl.pathname.startsWith(basePath)) {
      errors.push(
        `${slash(path.relative(root, file))}: internal href '${href}' escapes deployment base '${basePath}'.`
      );
      continue;
    }

    const targetFile = existingTarget(targetUrl.pathname, basePath);
    if (!targetFile) {
      errors.push(
        `${slash(path.relative(root, file))}: internal href '${href}' has no built target.`
      );
      continue;
    }

    if (targetUrl.hash && targetUrl.hash !== '#') {
      let fragment;
      try {
        fragment = decodeURIComponent(targetUrl.hash.slice(1));
      } catch {
        errors.push(`${slash(path.relative(root, file))}: invalid fragment in href '${href}'.`);
        continue;
      }

      if (targetFile.endsWith('.html')) {
        let ids = idCache.get(targetFile);
        if (!ids) {
          ids = htmlIds(targetFile);
          idCache.set(targetFile, ids);
        }
        if (!ids.has(fragment)) {
          errors.push(
            `${slash(path.relative(root, file))}: href '${href}' targets missing fragment '#${fragment}'.`
          );
        }
      }
    }
  }
}

if (errors.length) {
  console.error('Built link validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Built link validation passed (${checkedLinks} internal links checked).`);
