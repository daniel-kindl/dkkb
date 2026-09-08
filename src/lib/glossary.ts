import type { CollectionEntry } from 'astro:content';

type Doc = CollectionEntry<'docs'>;

export interface MarkdownSource {
  path: string;
  content: string;
}

const visibleStatuses = new Set(['reviewed', 'stable']);

function isVisible(doc: Doc): boolean {
  return visibleStatuses.has(doc.data.status) && !doc.data.sidebar?.hidden;
}

function compareByTitle(left: Doc, right: Doc): number {
  return left.data.title.localeCompare(right.data.title) || left.id.localeCompare(right.id);
}

export function selectGlossaryEntries(docs: Doc[]): Doc[] {
  return docs
    .filter((doc) => doc.data.type === 'glossary' && isVisible(doc))
    .sort(compareByTitle);
}

export function glossaryInitial(title: string): string {
  const first = title.trim().charAt(0).toLocaleUpperCase('en-US');
  return /^[A-Z0-9]$/.test(first) ? first : '#';
}

function stripCode(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]+`/g, '');
}

function markdownLinkTargets(markdown: string): string[] {
  const targets: string[] = [];
  const prose = stripCode(markdown);

  for (const match of prose.matchAll(/\[[^\]]*\]\(([^)\n]+)\)/g)) {
    const start = match.index ?? 0;
    if (start > 0 && prose[start - 1] === '!') continue;

    const raw = match[1].trim();
    if (!raw) continue;

    if (raw.startsWith('<')) {
      const closing = raw.indexOf('>');
      if (closing > 1) targets.push(raw.slice(1, closing));
      continue;
    }

    targets.push(raw.split(/\s+/, 1)[0]);
  }

  return targets;
}

function contentRelativePath(sourcePath: string): string | null {
  const normalized = sourcePath.replaceAll('\\', '/');
  const marker = '/content/docs/';
  const markerIndex = normalized.indexOf(marker);
  if (markerIndex >= 0) return normalized.slice(markerIndex + marker.length);

  const prefix = 'content/docs/';
  const prefixIndex = normalized.indexOf(prefix);
  return prefixIndex >= 0 ? normalized.slice(prefixIndex + prefix.length) : null;
}

function normalizeSegments(pathValue: string): string | null {
  const result: string[] = [];

  for (const segment of pathValue.split('/')) {
    if (!segment || segment === '.') continue;
    if (segment === '..') {
      if (result.length === 0) return null;
      result.pop();
      continue;
    }
    result.push(segment);
  }

  return result.join('/');
}

function contentIdFromPath(pathValue: string): string | null {
  const normalized = normalizeSegments(pathValue.replace(/\/+$/, ''));
  if (!normalized) return null;

  const withoutExtension = normalized.replace(/\.md$/, '');
  if (withoutExtension === 'index') return 'index';
  return withoutExtension.endsWith('/index')
    ? withoutExtension.slice(0, -'/index'.length)
    : withoutExtension;
}

function cleanDestination(destination: string): string | null {
  const withoutFragment = destination.split('#', 1)[0].split('?', 1)[0];
  if (!withoutFragment || withoutFragment.startsWith('#')) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(withoutFragment)) return null;

  try {
    return decodeURIComponent(withoutFragment);
  } catch {
    return null;
  }
}

function linkTargetsContentId(sourcePath: string, destination: string, targetId: string): boolean {
  const cleaned = cleanDestination(destination);
  if (!cleaned) return false;

  if (cleaned.startsWith('/')) {
    const route = cleaned.replace(/^\/+|\/+$/g, '').replace(/\.md$/, '');
    return route === targetId || route.endsWith(`/${targetId}`);
  }

  const sourceRelative = contentRelativePath(sourcePath);
  if (!sourceRelative) return false;

  const lastSlash = sourceRelative.lastIndexOf('/');
  const sourceDirectory = lastSlash >= 0 ? sourceRelative.slice(0, lastSlash) : '';
  const resolved = normalizeSegments(`${sourceDirectory}/${cleaned}`);
  if (!resolved) return false;

  return contentIdFromPath(resolved) === targetId;
}

function sourceId(sourcePath: string): string | null {
  const relative = contentRelativePath(sourcePath);
  return relative ? contentIdFromPath(relative) : null;
}

export function selectGlossaryBacklinks(
  docs: Doc[],
  sources: MarkdownSource[],
  targetId: string
): Doc[] {
  const sourceById = new Map<string, MarkdownSource>();
  for (const source of sources) {
    const id = sourceId(source.path);
    if (id) sourceById.set(id, source);
  }

  return docs
    .filter((doc) => {
      if (doc.id === targetId || !isVisible(doc)) return false;
      const source = sourceById.get(doc.id);
      if (!source) return false;

      return markdownLinkTargets(source.content).some((destination) =>
        linkTargetsContentId(source.path, destination, targetId)
      );
    })
    .sort(compareByTitle);
}
