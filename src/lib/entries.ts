// Entry-selection rules for the homepage, category indexes, and related-knowledge
// blocks. The Astro component owns rendering and the `isHomepage` check; this module
// owns *which* entries qualify and *in what order*. The homepage-eligibility rule
// lives in its own shared module so the validator and the renderer agree on it.

import type { CollectionEntry } from 'astro:content';
import { isHomepageEligible } from './homepage-eligibility.mjs';

type Doc = CollectionEntry<'docs'>;

const orderFor = (doc: Doc): number => doc.data.sidebar?.order ?? Number.MAX_SAFE_INTEGER;

const compareEntries = (left: Doc, right: Doc): number =>
  orderFor(left) - orderFor(right) || left.data.title.localeCompare(right.data.title);

const homepageOrderFor = (doc: Doc): number => doc.data.homepage?.order ?? 100;

const compareHomepageEntries = (left: Doc, right: Doc): number =>
  homepageOrderFor(left) - homepageOrderFor(right) ||
  left.data.title.localeCompare(right.data.title);

const compareRecentEntries = (left: Doc, right: Doc): number => {
  const leftReviewed = left.data.lastReviewed ?? '';
  const rightReviewed = right.data.lastReviewed ?? '';
  return rightReviewed.localeCompare(leftReviewed) || left.data.title.localeCompare(right.data.title);
};

/**
 * Split the collection into the four homepage sections. Each promotion section
 * ("Start here", "Featured", "Recently reviewed") is limited to homepage-eligible
 * entries and capped at six items; "Explore the knowledge base" lists the category
 * indexes.
 */
export function selectHomepageSections(docs: Doc[]): {
  startHere: Doc[];
  featured: Doc[];
  recent: Doc[];
  categories: Doc[];
} {
  const startHere = docs
    .filter((doc) => isHomepageEligible(doc.data) && doc.data.homepage?.startHere)
    .sort(compareHomepageEntries)
    .slice(0, 6);
  const featured = docs
    .filter((doc) => isHomepageEligible(doc.data) && doc.data.homepage?.featured)
    .sort(compareHomepageEntries)
    .slice(0, 6);
  const recent = docs
    .filter((doc) => isHomepageEligible(doc.data) && doc.data.lastReviewed)
    .sort(compareRecentEntries)
    .slice(0, 6);
  const categories = docs
    .filter(
      (doc) =>
        doc.data.type === 'index' &&
        doc.data.template !== 'splash' &&
        !doc.data.sidebar?.hidden
    )
    .sort((left, right) => left.data.title.localeCompare(right.data.title));
  return { startHere, featured, recent, categories };
}

/**
 * The direct children of a category index: non-index, non-hidden entries whose id
 * sits one level below `entry.id`, ordered by sidebar order then title.
 */
export function selectCategoryEntries(docs: Doc[], entry: Doc): Doc[] {
  return docs
    .filter((doc) => {
      if (doc.data.type === 'index' || doc.data.sidebar?.hidden) return false;
      if (!doc.id.startsWith(`${entry.id}/`)) return false;
      return !doc.id.slice(entry.id.length + 1).includes('/');
    })
    .sort(compareEntries);
}

/**
 * The entries named in `entry.data.related`, resolved to docs and kept in the
 * order the author listed them. Unknown ids are dropped.
 */
export function selectRelatedEntries(docs: Doc[], entry: Doc): Doc[] {
  const docsById = new Map(docs.map((doc) => [doc.id, doc]));
  return (entry.data.related ?? [])
    .map((relatedId) => docsById.get(relatedId))
    .filter((relatedEntry): relatedEntry is Doc => relatedEntry !== undefined);
}
