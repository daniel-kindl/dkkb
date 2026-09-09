import { describe, expect, it } from 'vitest';
import { buildSiteMetadata } from './site-metadata';

describe('buildSiteMetadata', () => {
  it('returns the stable metadata contract', () => {
    expect(buildSiteMetadata({
      version: '0.5.0',
      release: 'v0.5.0',
      commit: 'abc123',
      buildTimestamp: '2026-01-01T00:00:00.000Z',
      contentCount: 12,
      glossaryCount: 3,
    })).toEqual({
      schema: 1,
      application: 'dkkb',
      version: '0.5.0',
      release: 'v0.5.0',
      commit: 'abc123',
      build_timestamp: '2026-01-01T00:00:00.000Z',
      content: { entries: 12, glossary_entries: 3 },
    });
  });

  it('uses null for unavailable deployment details', () => {
    expect(buildSiteMetadata({
      version: '0.5.0',
      release: '',
      commit: null,
      buildTimestamp: null,
      contentCount: 0,
      glossaryCount: 0,
    }).release).toBeNull();
  });
});
