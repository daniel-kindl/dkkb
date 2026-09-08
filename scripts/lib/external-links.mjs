import YAML from 'yaml';

const httpPattern = /^https?:\/\//i;

function compareReferences(left, right) {
  return left.file.localeCompare(right.file) || left.url.localeCompare(right.url);
}

function addReference(target, seen, file, url, origin) {
  if (!httpPattern.test(url)) return;
  const key = `${file}\u0000${url}`;
  if (seen.has(key)) return;
  seen.add(key);
  target.push({ file, url, origin });
}

export function extractExternalReferences(file, markdown) {
  const references = [];
  const seen = new Set();
  const frontmatter = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  let body = markdown;

  if (frontmatter) {
    body = markdown.slice(frontmatter[0].length);
    const data = YAML.parse(frontmatter[1]);
    for (const source of Array.isArray(data?.sources) ? data.sources : []) {
      if (typeof source?.url === 'string') {
        addReference(references, seen, file, source.url.trim(), 'source');
      }
    }
  }

  const withoutCode = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]+`/g, '');

  for (const match of withoutCode.matchAll(/\[[^\]]*\]\((https?:\/\/[^)\s]+)(?:\s+[^)]*)?\)/gi)) {
    addReference(references, seen, file, match[1], 'markdown');
  }

  for (const match of withoutCode.matchAll(/<(https?:\/\/[^>\s]+)>/gi)) {
    addReference(references, seen, file, match[1], 'markdown');
  }

  return references.sort(compareReferences);
}

export function exclusionReason(urlValue, config = {}) {
  let url;
  try {
    url = new URL(urlValue);
  } catch {
    return 'invalid-url';
  }

  if (!['http:', 'https:'].includes(url.protocol)) return `scheme:${url.protocol}`;

  for (const host of config.excludedHosts ?? []) {
    if (url.hostname === host || url.hostname.endsWith(`.${host}`)) return `host:${host}`;
  }

  for (const prefix of config.excludedUrlPrefixes ?? []) {
    if (urlValue.startsWith(prefix)) return `prefix:${prefix}`;
  }

  return null;
}

export function classifyHttpStatus(status) {
  if (status >= 200 && status < 300) return 'ok';
  if (status >= 300 && status < 400) return 'redirect';
  if (status === 401 || status === 403) return 'access-restricted';
  if (status === 404 || status === 410) return 'not-found';
  if (status === 429) return 'rate-limited';
  if (status >= 500) return 'server-error';
  if (status >= 400) return 'client-error';
  return 'unexpected-status';
}

export function isRetryable(status) {
  return ['not-found', 'rate-limited', 'server-error', 'timeout', 'network-error'].includes(status);
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function checkExternalUrl(reference, config, fetchImpl = fetch) {
  const attemptStatuses = [];
  const maxAttempts = Math.max(1, (config.retries ?? 0) + 1);
  let last = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetchImpl(reference.url, {
        method: 'GET',
        redirect: 'manual',
        headers: {
          'user-agent': config.userAgent,
          accept: 'text/html,application/xhtml+xml,application/json,text/plain;q=0.8,*/*;q=0.5',
        },
        signal: AbortSignal.timeout(config.timeoutMs),
      });
      const status = classifyHttpStatus(response.status);
      attemptStatuses.push(status);
      const location = response.headers.get('location');
      await response.body?.cancel();
      last = {
        ...reference,
        status,
        httpStatus: response.status,
        location,
        attempts: attempt,
      };
    } catch (error) {
      const status = error?.name === 'TimeoutError' || error?.name === 'AbortError'
        ? 'timeout'
        : 'network-error';
      attemptStatuses.push(status);
      last = {
        ...reference,
        status,
        error: error instanceof Error ? error.message : String(error),
        attempts: attempt,
      };
    }

    if (!last || !isRetryable(last.status) || attempt === maxAttempts) break;
    await sleep((config.retryDelayMs ?? 0) * attempt);
  }

  const persistent = attemptStatuses.length > 1
    && attemptStatuses.every((status) => status === attemptStatuses[0]);
  return { ...last, persistent, attemptStatuses };
}

export async function mapWithConcurrency(items, concurrency, worker) {
  const output = new Array(items.length);
  let nextIndex = 0;

  async function run() {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= items.length) return;
      output[index] = await worker(items[index], index);
    }
  }

  const workerCount = Math.min(Math.max(1, concurrency), Math.max(1, items.length));
  await Promise.all(Array.from({ length: workerCount }, () => run()));
  return output;
}

export function summarizeExternalResults(results) {
  const sorted = [...results].sort(compareReferences);
  const counts = {};
  for (const result of sorted) counts[result.status] = (counts[result.status] ?? 0) + 1;

  return {
    checked: sorted.filter((result) => result.status !== 'excluded').length,
    excluded: counts.excluded ?? 0,
    counts: Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right))),
    results: sorted,
  };
}

export function isConfirmedFailure(result) {
  return ['not-found', 'server-error'].includes(result.status) && result.persistent === true;
}
