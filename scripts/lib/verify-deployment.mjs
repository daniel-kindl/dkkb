export const DEFAULT_ATTEMPTS = 3;
export const DEFAULT_TIMEOUT_MS = 30_000;

export const ROUTES = Object.freeze([
  { path: '', kind: 'html', title: 'DKKB' },
  { path: 'principles/', kind: 'html', title: 'Principles' },
  { path: 'glossary/', kind: 'html', title: 'Technical glossary' },
  { path: 'references/knowledge-graph/', kind: 'html', title: 'Knowledge graph' },
  { path: 'llms.txt', kind: 'text', marker: '# DKKB' },
  { path: 'dkkb-index.json', kind: 'index' },
  { path: 'dkkb-meta.json', kind: 'meta' },
]);

export function normalizeBase(base) {
  const trimmed = String(base ?? '').trim();
  if (!trimmed || trimmed === '/') return '/';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
}

export function resolveBaseUrl(deploymentUrl, siteBase = '/dkkb') {
  if (!deploymentUrl) {
    throw new Error('DEPLOYMENT_URL is required.');
  }

  const basePath = normalizeBase(siteBase);
  const url = new URL(deploymentUrl);
  if (!url.pathname.endsWith('/')) url.pathname += '/';

  const normalizedPath = url.pathname === '/' ? '/' : url.pathname;
  if (basePath !== '/' && (normalizedPath === '/' || !normalizedPath.startsWith(basePath))) {
    url.pathname = `${basePath}`;
  }

  return url;
}

export function routeUrl(baseUrl, path) {
  return new URL(path, baseUrl);
}

export function assertHtml(body, route) {
  if (!body.includes('<title>')) {
    throw new Error(`${label(route)}: response does not contain '<title>'`);
  }
  if (route.title && !body.includes(route.title)) {
    throw new Error(`${label(route)}: response does not contain title '${route.title}'`);
  }
}

export function assertText(body, route) {
  if (route.marker && !body.includes(route.marker)) {
    throw new Error(`${label(route)}: response does not contain '${route.marker}'`);
  }
}

export function assertIndex(data, siteBase = '/dkkb') {
  const expectedBase = normalizeBase(siteBase);
  if (data?.version !== 1) {
    throw new Error(`dkkb-index.json: expected version 1, got ${JSON.stringify(data?.version)}`);
  }
  if (data.base !== expectedBase) {
    throw new Error(`dkkb-index.json: expected base '${expectedBase}', got '${data.base}'`);
  }
  if (!Array.isArray(data.entries)) {
    throw new Error('dkkb-index.json: entries must be an array');
  }
}

export function assertMeta(data, expected = {}) {
  if (data?.schema !== 1) {
    throw new Error(`dkkb-meta.json: expected schema 1, got ${JSON.stringify(data?.schema)}`);
  }
  if (data.application !== 'dkkb') {
    throw new Error(`dkkb-meta.json: expected application 'dkkb', got '${data.application}'`);
  }
  if (typeof data.version !== 'string' || !data.version.trim()) {
    throw new Error('dkkb-meta.json: version is required');
  }
  if (expected.release && data.release !== expected.release) {
    throw new Error(`dkkb-meta.json: expected release '${expected.release}', got '${data.release}'`);
  }
  if (expected.commit && data.commit !== expected.commit) {
    throw new Error(`dkkb-meta.json: expected commit '${expected.commit}', got '${data.commit}'`);
  }
}

function label(route) {
  return route.path || '/';
}

export async function requestRoute(route, { baseUrl, fetchImpl = fetch, attempts = DEFAULT_ATTEMPTS, timeoutMs = DEFAULT_TIMEOUT_MS }) {
  const url = routeUrl(baseUrl, route.path);
  let response;
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      response = await fetchImpl(url, { signal: AbortSignal.timeout(timeoutMs) });
      if (response.ok) break;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 2_000));
    }
  }

  if (!response?.ok) {
    throw new Error(`${label(route)}: request failed after ${attempts} attempts: ${lastError?.message ?? 'unknown error'}`);
  }

  const body = await response.text();
  if (route.kind === 'html') {
    assertHtml(body, route);
    return body;
  }
  if (route.kind === 'text') {
    assertText(body, route);
    return body;
  }

  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch {
    throw new Error(`${label(route)}: response is not valid JSON`);
  }
  return parsed;
}

export async function verifyDeployment({
  deploymentUrl,
  expectedRelease = null,
  expectedCommit = null,
  siteBase = '/dkkb',
  fetchImpl = fetch,
  attempts = DEFAULT_ATTEMPTS,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  routes = ROUTES,
} = {}) {
  const baseUrl = resolveBaseUrl(deploymentUrl, siteBase);
  const results = [];

  for (const route of routes) {
    const payload = await requestRoute(route, { baseUrl, fetchImpl, attempts, timeoutMs });
    if (route.kind === 'index') assertIndex(payload, siteBase);
    if (route.kind === 'meta') assertMeta(payload, { release: expectedRelease, commit: expectedCommit });
    results.push(label(route));
  }

  return { baseUrl: baseUrl.toString(), verified: results };
}
