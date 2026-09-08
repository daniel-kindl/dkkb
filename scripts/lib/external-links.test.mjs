import { describe, expect, it } from 'vitest';
import {
  classifyHttpStatus,
  exclusionReason,
  extractExternalReferences,
  isConfirmedFailure,
  summarizeExternalResults,
} from './external-links.mjs';

describe('external reference parsing', () => {
  it('collects source metadata and authored Markdown links but ignores code', () => {
    const markdown = `---\ntitle: Example\nsources:\n  - type: primary-source\n    title: RFC\n    url: https://example.org/spec\n---\n\nSee [documentation](https://docs.example.org/guide).\n\n\`[code](https://ignored.example.org/)\`\n`;
    expect(extractExternalReferences('src/content/docs/example.md', markdown)).toEqual([
      { file: 'src/content/docs/example.md', url: 'https://docs.example.org/guide', origin: 'markdown' },
      { file: 'src/content/docs/example.md', url: 'https://example.org/spec', origin: 'source' },
    ]);
  });
});

describe('external reference classification', () => {
  it('distinguishes redirects, dead links, restricted access, rate limits, and server failures', () => {
    expect(classifyHttpStatus(204)).toBe('ok');
    expect(classifyHttpStatus(301)).toBe('redirect');
    expect(classifyHttpStatus(403)).toBe('access-restricted');
    expect(classifyHttpStatus(404)).toBe('not-found');
    expect(classifyHttpStatus(429)).toBe('rate-limited');
    expect(classifyHttpStatus(503)).toBe('server-error');
  });

  it('applies narrow host and URL-prefix exclusions', () => {
    const config = {
      excludedHosts: ['blocked.example.com'],
      excludedUrlPrefixes: ['https://example.org/private/'],
    };
    expect(exclusionReason('https://sub.blocked.example.com/a', config)).toBe('host:blocked.example.com');
    expect(exclusionReason('https://example.org/private/a', config)).toBe('prefix:https://example.org/private/');
    expect(exclusionReason('https://example.org/public', config)).toBeNull();
  });

  it('only treats repeated not-found or server errors as confirmed failures', () => {
    expect(isConfirmedFailure({ status: 'not-found', persistent: true })).toBe(true);
    expect(isConfirmedFailure({ status: 'server-error', persistent: true })).toBe(true);
    expect(isConfirmedFailure({ status: 'timeout', persistent: true })).toBe(false);
    expect(isConfirmedFailure({ status: 'not-found', persistent: false })).toBe(false);
  });

  it('summarizes results in stable file and URL order', () => {
    const report = summarizeExternalResults([
      { file: 'z.md', url: 'https://z.example', status: 'redirect' },
      { file: 'a.md', url: 'https://a.example', status: 'ok' },
    ]);
    expect(report.counts).toEqual({ ok: 1, redirect: 1 });
    expect(report.results.map((result) => result.file)).toEqual(['a.md', 'z.md']);
  });
});
