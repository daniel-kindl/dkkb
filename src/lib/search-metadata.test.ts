import { describe, expect, it } from 'vitest';
import { buildSearchMetadata } from './search-metadata';

const base = {
  title: 'Example',
  description: 'Example description',
  status: 'reviewed',
};

describe('buildSearchMetadata', () => {
  it('keeps representative glossary aliases searchable from canonical metadata', () => {
    const cases = [
      ['glossary/retrieval-augmented-generation', ['RAG']],
      ['glossary/time-to-live', ['TTL']],
      ['glossary/optimistic-concurrency', ['OCC']],
    ] as const;

    for (const [id, aliases] of cases) {
      expect(buildSearchMetadata({ id, aliases: [...aliases], topics: ['glossary'], ...base }))
        .toMatchObject({ id, aliases: [...aliases] });
    }
  });

  it('excludes draft, deprecated, and hidden entries', () => {
    expect(buildSearchMetadata({ id: 'draft', ...base, status: 'draft' })).toBeNull();
    expect(buildSearchMetadata({ id: 'old', ...base, status: 'deprecated' })).toBeNull();
    expect(buildSearchMetadata({ id: 'hidden', ...base, hidden: true })).toBeNull();
  });

  it('removes empty and exact duplicate alias/topic values without changing authored order', () => {
    expect(buildSearchMetadata({
      id: 'glossary/example',
      aliases: ['API', '', 'API', ' Interface '],
      topics: ['glossary', ' glossary ', 'networking'],
      ...base,
    })).toMatchObject({
      aliases: ['API', 'Interface'],
      topics: ['glossary', 'networking'],
    });
  });
});
