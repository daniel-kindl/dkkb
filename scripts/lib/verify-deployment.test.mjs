import { describe, expect, it } from 'vitest';
import {
  assertIndex,
  assertMeta,
  resolveBaseUrl,
  ROUTES,
  verifyDeployment,
} from './verify-deployment.mjs';

describe('resolveBaseUrl', () => {
  it('appends the site base when the deployment origin omits it', () => {
    expect(resolveBaseUrl('https://daniel-kindl.github.io', '/dkkb').toString())
      .toBe('https://daniel-kindl.github.io/dkkb/');
  });

  it('keeps an existing project base path', () => {
    expect(resolveBaseUrl('https://daniel-kindl.github.io/dkkb', '/dkkb').toString())
      .toBe('https://daniel-kindl.github.io/dkkb/');
  });
});

describe('machine contracts', () => {
  it('requires dkkb-index.json version and base path', () => {
    expect(() => assertIndex({ version: 1, base: '/dkkb/', entries: [] })).not.toThrow();
    expect(() => assertIndex({ version: 2, base: '/dkkb/', entries: [] }))
      .toThrow("dkkb-index.json: expected version 1");
    expect(() => assertIndex({ version: 1, base: '/', entries: [] }))
      .toThrow("dkkb-index.json: expected base '/dkkb/'");
  });

  it('requires dkkb-meta.json identity fields', () => {
    expect(() => assertMeta({
      schema: 1,
      application: 'dkkb',
      version: '0.1.0',
      release: 'v0.1.0',
      commit: 'abc',
    }, { release: 'v0.1.0', commit: 'abc' })).not.toThrow();

    expect(() => assertMeta({
      schema: 1,
      application: 'dkkb',
      version: '0.1.0',
      release: 'v0.2.0',
      commit: 'abc',
    }, { release: 'v0.1.0' })).toThrow("dkkb-meta.json: expected release 'v0.1.0'");
  });
});

describe('verifyDeployment', () => {
  it('covers the representative production route set', () => {
    expect(ROUTES.map((route) => route.path || '/')).toEqual([
      '/',
      'principles/',
      'glossary/',
      'references/knowledge-graph/',
      'llms.txt',
      'dkkb-index.json',
      'dkkb-meta.json',
    ]);
  });

  it('parses JSON and checks titles against fetched routes', async () => {
    const bodies = {
      'https://example.test/dkkb/': '<title>DKKB</title>',
      'https://example.test/dkkb/principles/': '<title>Principles</title>',
      'https://example.test/dkkb/glossary/': '<title>Technical glossary</title>',
      'https://example.test/dkkb/references/knowledge-graph/': '<title>Knowledge graph</title>',
      'https://example.test/dkkb/llms.txt': '# DKKB\n',
      'https://example.test/dkkb/dkkb-index.json': JSON.stringify({ version: 1, base: '/dkkb/', entries: [] }),
      'https://example.test/dkkb/dkkb-meta.json': JSON.stringify({
        schema: 1,
        application: 'dkkb',
        version: '0.1.0',
        release: 'v0.1.0',
        commit: 'deadbeef',
      }),
    };

    const result = await verifyDeployment({
      deploymentUrl: 'https://example.test',
      expectedRelease: 'v0.1.0',
      expectedCommit: 'deadbeef',
      attempts: 1,
      fetchImpl: async (url) => ({
        ok: true,
        text: async () => bodies[url.toString()],
      }),
    });

    expect(result.verified).toHaveLength(7);
  });

  it('names the failing route and invariant', async () => {
    const bodies = {
      'https://example.test/dkkb/': '<title>DKKB</title>',
      'https://example.test/dkkb/principles/': '<title>Principles</title>',
      'https://example.test/dkkb/glossary/': '<title>Technical glossary</title>',
    };

    await expect(verifyDeployment({
      deploymentUrl: 'https://example.test/dkkb/',
      attempts: 1,
      fetchImpl: async (url) => ({
        ok: url.toString() !== 'https://example.test/dkkb/glossary/',
        status: url.toString() === 'https://example.test/dkkb/glossary/' ? 404 : 200,
        text: async () => bodies[url.toString()] ?? '<title>DKKB</title>',
      }),
    })).rejects.toThrow('glossary/: request failed after 1 attempts: HTTP 404');
  });
});
