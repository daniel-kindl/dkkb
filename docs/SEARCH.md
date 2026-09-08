# Search indexing

DKKB uses Starlight's built-in Pagefind integration. Canonical Markdown and frontmatter remain the source of search metadata.

## Indexed metadata

Reviewed and stable visible entries expose these Pagefind metadata fields at build time:

- `title`: the canonical entry title;
- `description`: the canonical frontmatter description;
- `aliases`: authored glossary aliases, when present;
- `topics`: authored topic metadata;
- `entry_id`: the stable canonical content ID.

The metadata elements are hidden and marked `data-pagefind-ignore`, so they do not add visible article text. Pagefind still reads metadata inside ignored elements and includes custom metadata fields in search matching.

Draft, deprecated, and sidebar-hidden entries do not receive this additional metadata.

## Ranking

The canonical title has the strongest metadata weight. Glossary aliases receive a strong but lower weight so searches such as `RAG`, `TTL`, or `OCC` resolve to the canonical term without creating synonym pages. Descriptions have a moderate weight and topics have a smaller supporting weight.

Do not add search-only aliases outside canonical frontmatter. Add a glossary alias only when it is a real synonym, acronym, or common alternate form under the glossary policy.

## Validation

`src/lib/search-metadata.test.ts` verifies representative aliases and visibility rules. The normal static build remains the integration gate for Pagefind and GitHub Pages base-path behavior.
