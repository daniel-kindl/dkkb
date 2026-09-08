import { describe, expect, it } from 'vitest';
import { buildAiIndex, renderLlmsTxt } from './ai-index';

const baseEntry = {
  description: 'Description',
  type: 'concept',
  status: 'reviewed',
  topics: [],
  aliases: [],
  related: [],
};

describe('buildAiIndex', () => {
  it('excludes draft, deprecated, and hidden content', () => {
    const index = buildAiIndex([
      { id: 'alpha/visible', title: 'Visible', ...baseEntry },
      { id: 'alpha/draft', title: 'Draft', ...baseEntry, status: 'draft' },
      { id: 'alpha/old', title: 'Old', ...baseEntry, status: 'deprecated' },
      { id: 'alpha/hidden', title: 'Hidden', ...baseEntry, hidden: true },
    ], 'https://example.com', '/dkkb');

    expect(index.entries.map((entry) => entry.id)).toEqual(['alpha/visible']);
  });

  it('builds base-safe routes and prunes relationships to publicly eligible entries', () => {
    const index = buildAiIndex([
      {
        id: 'networking/dns',
        title: 'DNS',
        ...baseEntry,
        aliases: ['Domain Name System'],
        topics: ['networking'],
        related: ['networking/tcp', 'networking/draft'],
      },
      { id: 'networking/tcp', title: 'TCP', ...baseEntry },
      { id: 'networking/draft', title: 'Draft', ...baseEntry, status: 'draft' },
    ], 'https://daniel-kindl.github.io', '/dkkb');

    const dns = index.entries.find((entry) => entry.id === 'networking/dns');
    expect(dns).toMatchObject({
      route: '/dkkb/networking/dns/',
      url: 'https://daniel-kindl.github.io/dkkb/networking/dns/',
      aliases: ['Domain Name System'],
      related: ['networking/tcp'],
    });
  });

  it('orders entries deterministically by category, title, and id', () => {
    const index = buildAiIndex([
      { id: 'zeta/b', title: 'Beta', ...baseEntry },
      { id: 'alpha/z', title: 'Zulu', ...baseEntry },
      { id: 'alpha/a', title: 'Alpha', ...baseEntry },
    ], 'https://example.com', '/docs');

    expect(index.entries.map((entry) => entry.id)).toEqual(['alpha/a', 'alpha/z', 'zeta/b']);
  });
});

describe('renderLlmsTxt', () => {
  it('renders deterministic H2 category sections with canonical links and aliases', () => {
    const index = buildAiIndex([
      {
        id: 'glossary/retrieval-augmented-generation',
        title: 'Retrieval-augmented generation',
        ...baseEntry,
        type: 'glossary',
        aliases: ['RAG'],
      },
    ], 'https://example.com', '/dkkb');

    const output = renderLlmsTxt(index);
    expect(output).toContain('## glossary');
    expect(output).toContain('[Retrieval-augmented generation](https://example.com/dkkb/glossary/retrieval-augmented-generation/)');
    expect(output).toContain('Aliases: RAG');
  });
});
