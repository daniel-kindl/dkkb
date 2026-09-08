import { describe, expect, it } from 'vitest';
import {
  deriveKnowledgeGraph,
  findKnowledgeOrphans,
  markdownLinkTargets,
  resolveKnowledgeLink,
} from './knowledge-graph-core.mjs';

function entry(id, overrides = {}) {
  return {
    id,
    title: id,
    description: `Description for ${id}`,
    type: 'concept',
    status: 'reviewed',
    hidden: false,
    related: [],
    path: `src/content/docs/${id}.md`,
    markdown: `# ${id}\n`,
    ...overrides,
  };
}

describe('knowledge graph derivation', () => {
  it('uses related metadata and authored Markdown links as distinct deterministic edges', () => {
    const entries = [
      entry('zeta/item', { title: 'Zeta' }),
      entry('alpha/source', {
        title: 'Alpha',
        related: ['zeta/item'],
        markdown: '[Beta](../beta/target.md)\n[Beta again](../beta/target.md)\n',
      }),
      entry('beta/target', { title: 'Beta' }),
    ];

    expect(deriveKnowledgeGraph(entries)).toEqual({
      nodes: [
        expect.objectContaining({ id: 'alpha/source' }),
        expect.objectContaining({ id: 'beta/target' }),
        expect.objectContaining({ id: 'zeta/item' }),
      ],
      edges: [
        { source: 'alpha/source', target: 'beta/target', type: 'markdown' },
        { source: 'alpha/source', target: 'zeta/item', type: 'related' },
      ],
    });
  });

  it('excludes draft, deprecated, hidden, and index entries from graph nodes and orphan candidates', () => {
    const entries = [
      entry('kept'),
      entry('draft', { status: 'draft' }),
      entry('deprecated', { status: 'deprecated' }),
      entry('hidden', { hidden: true }),
      entry('category', { type: 'index', markdown: '[Kept](kept.md)\n' }),
    ];

    expect(deriveKnowledgeGraph(entries).nodes.map((node) => node.id)).toEqual(['kept']);
    expect(findKnowledgeOrphans(entries).map((node) => node.id)).toEqual(['kept']);
  });

  it('does not count plain mentions, code links, images, or index navigation as knowledge relationships', () => {
    const entries = [
      entry('alpha'),
      entry('beta', {
        markdown: 'alpha is plain text. `See [Alpha](alpha.md)`. ![image](alpha.md)\n',
      }),
      entry('section', {
        type: 'index',
        markdown: '[Alpha](alpha.md)\n[Beta](beta.md)\n',
      }),
    ];

    expect(deriveKnowledgeGraph(entries).edges).toEqual([]);
    expect(findKnowledgeOrphans(entries).map((node) => node.id)).toEqual(['alpha', 'beta']);
  });

  it('treats incoming or outgoing authored relationships as enough to avoid orphan status', () => {
    const entries = [
      entry('alpha/source', { markdown: '[Target](../beta/target.md)\n' }),
      entry('beta/target'),
      entry('gamma/orphan'),
    ];

    expect(findKnowledgeOrphans(entries).map((node) => node.id)).toEqual(['gamma/orphan']);
  });
});

describe('Markdown relationship parsing', () => {
  it('resolves source-relative and deployment-base absolute routes', () => {
    const ids = new Set(['glossary/cache', 'performance/caching']);

    expect(resolveKnowledgeLink(
      'src/content/docs/performance/caching.md',
      '../glossary/cache.md',
      ids
    )).toBe('glossary/cache');
    expect(resolveKnowledgeLink(
      'src/content/docs/performance/caching.md',
      '/dkkb/glossary/cache/',
      ids
    )).toBe('glossary/cache');
  });

  it('ignores images and links inside code', () => {
    expect(markdownLinkTargets(
      'See [Cache](../glossary/cache.md). `See [Retry](retry.md)`. ![Diagram](image.md)\n'
    )).toEqual(['../glossary/cache.md']);
  });
});
