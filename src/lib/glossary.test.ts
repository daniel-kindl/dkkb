import { describe, expect, it } from 'vitest';
import type { CollectionEntry } from 'astro:content';
import {
  glossaryInitial,
  selectGlossaryBacklinks,
  selectGlossaryEntries,
  type MarkdownSource,
} from './glossary';

type Doc = CollectionEntry<'docs'>;

function doc(id: string, data: Partial<Doc['data']> = {}): Doc {
  return {
    id,
    data: {
      title: id,
      description: `desc ${id}`,
      type: 'concept',
      status: 'reviewed',
      provenance: ['derived-guidance'],
      topics: [],
      related: [],
      sources: [],
      ...data,
    },
  } as unknown as Doc;
}

function source(id: string, content: string): MarkdownSource {
  const path = id === 'index' ? '../content/docs/index.md' : `../content/docs/${id}.md`;
  return { path, content };
}

const ids = (docs: Doc[]): string[] => docs.map((entry) => entry.id);

describe('selectGlossaryEntries', () => {
  it('returns visible reviewed or stable glossary terms in deterministic title order', () => {
    const docs = [
      doc('glossary/zeta', { type: 'glossary', title: 'Zeta' }),
      doc('glossary/alpha', { type: 'glossary', title: 'Alpha', status: 'stable' }),
      doc('glossary/draft', { type: 'glossary', title: 'Draft', status: 'draft' }),
      doc('glossary/old', { type: 'glossary', title: 'Old', status: 'deprecated' }),
      doc('glossary/hidden', {
        type: 'glossary',
        title: 'Hidden',
        sidebar: { hidden: true },
      }),
      doc('llm/context', { title: 'Context' }),
    ];

    expect(ids(selectGlossaryEntries(docs))).toEqual(['glossary/alpha', 'glossary/zeta']);
  });
});

describe('glossaryInitial', () => {
  it('groups ordinary engineering terms by uppercase initial and uses a fallback otherwise', () => {
    expect(glossaryInitial('b-tree')).toBe('B');
    expect(glossaryInitial('2-phase commit')).toBe('2');
    expect(glossaryInitial('_internal')).toBe('#');
  });
});

describe('selectGlossaryBacklinks', () => {
  const target = doc('glossary/large-language-model', {
    type: 'glossary',
    title: 'Large language model',
  });

  it('derives backlinks from source-relative, route-relative, and absolute Markdown links', () => {
    const alpha = doc('llm/alpha', { title: 'Alpha' });
    const beta = doc('llm/beta', { title: 'Beta' });
    const zeta = doc('llm/zeta', { title: 'Zeta' });
    const plainMention = doc('llm/plain', { title: 'Plain mention' });
    const docs = [target, zeta, plainMention, beta, alpha];
    const sources = [
      source('glossary/large-language-model', '# Large language model\n'),
      source('llm/alpha', 'An [LLM](../glossary/large-language-model.md) is used here.\n'),
      source('llm/beta', 'An [LLM](../../glossary/large-language-model/) is used here.\n'),
      source('llm/zeta', 'See [the term](/dkkb/glossary/large-language-model/).\n'),
      source('llm/plain', 'LLM is only plain text here.\n'),
    ];

    expect(ids(selectGlossaryBacklinks(docs, sources, target.id))).toEqual([
      'llm/alpha',
      'llm/beta',
      'llm/zeta',
    ]);
  });

  it('ignores links inside code and excludes hidden, draft, deprecated, and self entries', () => {
    const visible = doc('llm/visible', { title: 'Visible' });
    const hidden = doc('llm/hidden', { title: 'Hidden', sidebar: { hidden: true } });
    const draft = doc('llm/draft', { title: 'Draft', status: 'draft' });
    const deprecated = doc('llm/deprecated', { title: 'Deprecated', status: 'deprecated' });
    const code = doc('llm/code', { title: 'Code' });
    const markdown = '[LLM](../glossary/large-language-model.md)\n';
    const docs = [target, visible, hidden, draft, deprecated, code];
    const sources = [
      source('glossary/large-language-model', markdown),
      source('llm/visible', markdown),
      source('llm/hidden', markdown),
      source('llm/draft', markdown),
      source('llm/deprecated', markdown),
      source('llm/code', '`[LLM](../glossary/large-language-model.md)`\n'),
    ];

    expect(ids(selectGlossaryBacklinks(docs, sources, target.id))).toEqual(['llm/visible']);
  });

  it('resolves links from category index source paths', () => {
    const index = doc('llm', { type: 'index', title: 'LLM engineering', status: 'stable' });
    const sources: MarkdownSource[] = [
      {
        path: '../content/docs/llm/index.md',
        content: 'See [LLM](../glossary/large-language-model.md).\n',
      },
    ];

    expect(ids(selectGlossaryBacklinks([target, index], sources, target.id))).toEqual(['llm']);
  });
});
