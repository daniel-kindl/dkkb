const visibleStatuses = new Set(['reviewed', 'stable']);

function normalizeSegments(pathValue) {
  const result = [];

  for (const segment of pathValue.replaceAll('\\', '/').split('/')) {
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

export function contentIdFromSourcePath(sourcePath) {
  const normalized = sourcePath.replaceAll('\\', '/');
  const marker = '/content/docs/';
  const markerIndex = normalized.indexOf(marker);
  const relative = markerIndex >= 0
    ? normalized.slice(markerIndex + marker.length)
    : normalized.startsWith('content/docs/')
      ? normalized.slice('content/docs/'.length)
      : normalized.startsWith('src/content/docs/')
        ? normalized.slice('src/content/docs/'.length)
        : null;

  if (!relative) return null;

  const clean = normalizeSegments(relative);
  if (!clean) return null;
  const withoutExtension = clean.replace(/\.md$/, '');
  if (withoutExtension === 'index') return 'index';
  return withoutExtension.endsWith('/index')
    ? withoutExtension.slice(0, -'/index'.length)
    : withoutExtension;
}

function stripCode(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]+`/g, '');
}

export function markdownLinkTargets(markdown) {
  const targets = [];
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

function cleanDestination(destination) {
  const withoutFragment = destination.split('#', 1)[0].split('?', 1)[0];
  if (!withoutFragment || withoutFragment.startsWith('#')) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(withoutFragment)) return null;

  try {
    return decodeURIComponent(withoutFragment);
  } catch {
    return null;
  }
}

function contentIdFromRelativePath(pathValue) {
  const normalized = normalizeSegments(pathValue.replace(/\/+$/, ''));
  if (!normalized) return null;

  const withoutExtension = normalized.replace(/\.md$/, '');
  if (withoutExtension === 'index') return 'index';
  return withoutExtension.endsWith('/index')
    ? withoutExtension.slice(0, -'/index'.length)
    : withoutExtension;
}

export function resolveKnowledgeLink(sourcePath, destination, knownIds) {
  const cleaned = cleanDestination(destination);
  if (!cleaned) return null;

  const known = knownIds instanceof Set ? knownIds : new Set(knownIds);

  if (cleaned.startsWith('/')) {
    const route = normalizeSegments(cleaned.replace(/^\/+|\/+$/g, '').replace(/\.md$/, ''));
    if (!route) return null;

    const matches = [...known]
      .filter((id) => route === id || route.endsWith(`/${id}`))
      .sort((left, right) => right.length - left.length || left.localeCompare(right));
    return matches[0] ?? null;
  }

  const sourceId = contentIdFromSourcePath(sourcePath);
  if (!sourceId) return null;

  const normalizedPath = sourcePath.replaceAll('\\', '/');
  const marker = '/content/docs/';
  const markerIndex = normalizedPath.indexOf(marker);
  const sourceRelative = markerIndex >= 0
    ? normalizedPath.slice(markerIndex + marker.length)
    : normalizedPath.startsWith('src/content/docs/')
      ? normalizedPath.slice('src/content/docs/'.length)
      : normalizedPath.startsWith('content/docs/')
        ? normalizedPath.slice('content/docs/'.length)
        : null;

  if (!sourceRelative) return null;
  const lastSlash = sourceRelative.lastIndexOf('/');
  const sourceDirectory = lastSlash >= 0 ? sourceRelative.slice(0, lastSlash) : '';
  const resolved = normalizeSegments(`${sourceDirectory}/${cleaned}`);
  const targetId = resolved ? contentIdFromRelativePath(resolved) : null;
  return targetId && known.has(targetId) ? targetId : null;
}

function isGraphEntry(entry) {
  return visibleStatuses.has(entry.status)
    && entry.type !== 'index'
    && entry.hidden !== true
    && entry.system !== true;
}

function compareNodes(left, right) {
  return left.title.localeCompare(right.title) || left.id.localeCompare(right.id);
}

function compareEdges(left, right) {
  return left.source.localeCompare(right.source)
    || left.target.localeCompare(right.target)
    || left.type.localeCompare(right.type);
}

export function deriveKnowledgeGraph(entries) {
  const candidates = entries.filter(isGraphEntry);
  const knownIds = new Set(candidates.map((entry) => entry.id));
  const nodes = candidates
    .map((entry) => ({
      id: entry.id,
      title: entry.title,
      description: entry.description ?? '',
      category: entry.id.includes('/') ? entry.id.split('/', 1)[0] : 'root',
      path: entry.path,
    }))
    .sort(compareNodes);

  const edgeKeys = new Set();
  const edges = [];
  const addEdge = (source, target, type) => {
    if (!target || source === target || !knownIds.has(target)) return;
    const key = `${source}\u0000${target}\u0000${type}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    edges.push({ source, target, type });
  };

  for (const entry of candidates) {
    for (const target of entry.related ?? []) addEdge(entry.id, target, 'related');

    for (const destination of markdownLinkTargets(entry.markdown ?? '')) {
      addEdge(entry.id, resolveKnowledgeLink(entry.path, destination, knownIds), 'markdown');
    }
  }

  edges.sort(compareEdges);
  return { nodes, edges };
}

export function findKnowledgeOrphans(entries) {
  const graph = deriveKnowledgeGraph(entries);
  const connected = new Set();

  for (const edge of graph.edges) {
    connected.add(edge.source);
    connected.add(edge.target);
  }

  return graph.nodes
    .filter((node) => !connected.has(node.id))
    .map((node) => ({
      id: node.id,
      title: node.title,
      category: node.category,
      path: node.path,
    }));
}
