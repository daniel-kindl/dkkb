import { describe, it, expect } from 'vitest';
import type { CollectionEntry } from 'astro:content';
import {
  selectHomepageSections,
  selectCategoryEntries,
  selectRelatedEntries,
} from './entries';

type Doc = CollectionEntry<'docs'>;

// Minimal doc factory. Only the fields the selection rules read are set; the rest
// of the collection-entry shape is not exercised, so the cast is safe for tests.
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

const ids = (docs: Doc[]): string[] => docs.map((entry) => entry.id);

describe('selectHomepageSections', () => {
  it('keeps only homepage-eligible entries that request "startHere"', () => {
    const docs = [
      doc('a', { homepage: { startHere: true, featured: false, order: 100 } }),
      // requests startHere but is a draft -> not eligible
      doc('b', { status: 'draft', homepage: { startHere: true, featured: false, order: 100 } }),
      // eligible but does not request startHere
      doc('c', {}),
      // requests startHere but is sidebar-hidden -> not eligible
      doc('d', {
        sidebar: { hidden: true },
        homepage: { startHere: true, featured: false, order: 100 },
      }),
      // requests startHere but is an index -> not eligible
      doc('e', { type: 'index', homepage: { startHere: true, featured: false, order: 100 } }),
    ];
    const { startHere } = selectHomepageSections(docs);
    expect(ids(startHere)).toEqual(['a']);
  });

  it('orders promotion sections by homepage.order then title', () => {
    const docs = [
      doc('gamma', { homepage: { startHere: true, featured: false, order: 20 } }),
      doc('alpha', { homepage: { startHere: true, featured: false, order: 10 } }),
      doc('beta', { homepage: { startHere: true, featured: false, order: 10 } }),
    ];
    const { startHere } = selectHomepageSections(docs);
    expect(ids(startHere)).toEqual(['alpha', 'beta', 'gamma']);
  });

  it('caps each promotion section at six entries', () => {
    const docs = Array.from({ length: 8 }, (_unused, index) =>
      doc(`entry-${index}`, {
        homepage: { startHere: true, featured: false, order: index },
      })
    );
    const { startHere } = selectHomepageSections(docs);
    expect(startHere).toHaveLength(6);
    expect(ids(startHere)).toEqual([
      'entry-0',
      'entry-1',
      'entry-2',
      'entry-3',
      'entry-4',
      'entry-5',
    ]);
  });

  it('selects featured entries independently of startHere', () => {
    const docs = [
      doc('a', { homepage: { startHere: false, featured: true, order: 100 } }),
      doc('b', { homepage: { startHere: true, featured: false, order: 100 } }),
    ];
    const { featured } = selectHomepageSections(docs);
    expect(ids(featured)).toEqual(['a']);
  });

  it('orders recent entries by lastReviewed descending then title', () => {
    const docs = [
      doc('older', { lastReviewed: '2026-01-01' }),
      doc('newest', { lastReviewed: '2026-09-01' }),
      doc('middle-b', { lastReviewed: '2026-05-01' }),
      doc('middle-a', { lastReviewed: '2026-05-01' }),
      // eligible but never reviewed -> excluded from recent
      doc('unreviewed', {}),
    ];
    const { recent } = selectHomepageSections(docs);
    expect(ids(recent)).toEqual(['newest', 'middle-a', 'middle-b', 'older']);
  });

  it('lists category indexes (non-splash, not hidden) sorted by title', () => {
    const docs = [
      doc('testing', { type: 'index', title: 'Testing' }),
      doc('coding', { type: 'index', title: 'Coding' }),
      doc('home', { type: 'index', title: 'Home', template: 'splash' }),
      doc('secret', { type: 'index', title: 'Secret', sidebar: { hidden: true } }),
      doc('leaf', { title: 'Leaf' }),
    ];
    const { categories } = selectHomepageSections(docs);
    expect(ids(categories)).toEqual(['coding', 'testing']);
  });
});

describe('selectCategoryEntries', () => {
  const category = doc('coding', { type: 'index', title: 'Coding' });

  it('returns direct children only, excluding indexes and hidden entries', () => {
    const docs = [
      category,
      doc('coding/naming', { title: 'Naming' }),
      doc('coding/style', { title: 'Style' }),
      // nested one level deeper -> not a direct child
      doc('coding/style/braces', { title: 'Braces' }),
      // child index -> excluded
      doc('coding/sub', { type: 'index', title: 'Sub' }),
      // hidden child -> excluded
      doc('coding/hidden', { title: 'Hidden', sidebar: { hidden: true } }),
      // different category -> excluded
      doc('testing/unit', { title: 'Unit' }),
    ];
    expect(ids(selectCategoryEntries(docs, category))).toEqual(['coding/naming', 'coding/style']);
  });

  it('orders children by sidebar.order then title', () => {
    const docs = [
      category,
      doc('coding/c', { title: 'C', sidebar: { order: 2 } }),
      doc('coding/a', { title: 'A', sidebar: { order: 1 } }),
      // no order -> falls to the end, then title-sorted
      doc('coding/z', { title: 'Z' }),
      doc('coding/m', { title: 'M' }),
    ];
    expect(ids(selectCategoryEntries(docs, category))).toEqual([
      'coding/a',
      'coding/c',
      'coding/m',
      'coding/z',
    ]);
  });
});

describe('selectRelatedEntries', () => {
  it('resolves related ids in author order and drops unknown ids', () => {
    const entry = doc('a', { related: ['c', 'missing', 'b'] });
    const docs = [entry, doc('b'), doc('c')];
    expect(ids(selectRelatedEntries(docs, entry))).toEqual(['c', 'b']);
  });

  it('returns an empty list when there are no related ids', () => {
    const entry = doc('a', { related: [] });
    expect(selectRelatedEntries([entry], entry)).toEqual([]);
  });
});
