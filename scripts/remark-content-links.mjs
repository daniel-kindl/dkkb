import path from 'node:path';
import process from 'node:process';

const contentRoot = path.join(process.cwd(), 'src', 'content', 'docs');

function normalizeBase(base) {
  const trimmed = String(base ?? '').trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

function contentIdFor(file) {
  const relative = path.relative(contentRoot, file).split(path.sep).join('/');
  if (!relative || relative.startsWith('../') || path.isAbsolute(relative)) return null;

  const withoutExtension = relative.replace(/\.md$/, '');
  if (withoutExtension === 'index') return 'index';
  return withoutExtension.endsWith('/index')
    ? withoutExtension.slice(0, -'/index'.length)
    : withoutExtension;
}

function splitDestination(destination) {
  const hashIndex = destination.indexOf('#');
  const queryIndex = destination.indexOf('?');
  const suffixIndex = [hashIndex, queryIndex]
    .filter((index) => index >= 0)
    .sort((left, right) => left - right)[0];

  if (suffixIndex === undefined) return { pathname: destination, suffix: '' };
  return {
    pathname: destination.slice(0, suffixIndex),
    suffix: destination.slice(suffixIndex),
  };
}

export function rewriteContentLink(destination, sourceFile, base) {
  if (typeof destination !== 'string' || typeof sourceFile !== 'string') return destination;
  if (!destination || destination.startsWith('#') || destination.startsWith('/')) return destination;
  if (/^[a-z][a-z0-9+.-]*:/i.test(destination)) return destination;

  const { pathname, suffix } = splitDestination(destination);
  if (!pathname.toLowerCase().endsWith('.md')) return destination;

  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return destination;
  }

  const targetFile = path.resolve(path.dirname(sourceFile), decoded);
  const targetId = contentIdFor(targetFile);
  if (!targetId) return destination;

  const basePath = normalizeBase(base);
  const route = targetId === 'index' ? basePath : `${basePath}${targetId}/`;
  return `${route}${suffix}`;
}

function visit(node, transform) {
  transform(node);
  if (!Array.isArray(node?.children)) return;
  for (const child of node.children) visit(child, transform);
}

export default function remarkContentLinks(options = {}) {
  const base = options.base ?? '/';

  return (tree, file) => {
    const sourceFile = typeof file?.path === 'string' ? file.path : null;
    if (!sourceFile) return;

    visit(tree, (node) => {
      if (node?.type !== 'link' || typeof node.url !== 'string') return;
      node.url = rewriteContentLink(node.url, sourceFile, base);
    });
  };
}
