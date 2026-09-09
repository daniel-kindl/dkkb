const deploymentUrl = process.env.DEPLOYMENT_URL;
const expectedRelease = process.env.DKKB_RELEASE || null;
const expectedCommit = process.env.DKKB_COMMIT || null;

if (!deploymentUrl) {
  throw new Error('DEPLOYMENT_URL is required.');
}

const baseUrl = deploymentUrl.endsWith('/') ? deploymentUrl : `${deploymentUrl}/`;
const routes = [
  { path: '', kind: 'html', marker: '<title>' },
  { path: 'glossary/', kind: 'html', marker: '<title>' },
  { path: 'references/knowledge-graph/', kind: 'html', marker: '<title>' },
  { path: 'llms.txt', kind: 'text', marker: 'DKKB' },
  { path: 'dkkb-index.json', kind: 'json' },
  { path: 'dkkb-meta.json', kind: 'json' },
];

async function request(route) {
  const url = new URL(route.path, baseUrl);
  let response;
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
      if (response.ok) break;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 2_000));
  }
  if (!response?.ok) {
    throw new Error(`${route.path || '/'}: request failed after 3 attempts: ${lastError.message}`);
  }
  const body = await response.text();
  if (route.kind === 'json') {
    try {
      return JSON.parse(body);
    } catch {
      throw new Error(`${route.path}: response is not valid JSON`);
    }
  }
  if (route.marker && !body.includes(route.marker)) {
    throw new Error(`${route.path || '/'}: response does not contain '${route.marker}'`);
  }
  return body;
}

for (const route of routes) {
  const result = await request(route);
  if (route.path === 'dkkb-meta.json') {
    if (expectedRelease && result.release !== expectedRelease) {
      throw new Error(`dkkb-meta.json: expected release '${expectedRelease}', got '${result.release}'`);
    }
    if (expectedCommit && result.commit !== expectedCommit) {
      throw new Error(`dkkb-meta.json: expected commit '${expectedCommit}', got '${result.commit}'`);
    }
  }
  console.log(`verified ${route.path || '/'}`);
}
