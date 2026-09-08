# AI-friendly discovery index

DKKB publishes static discovery artifacts for AI agents. They are generated from the same Astro content collection that renders the human site, so canonical Markdown and frontmatter remain authoritative.

## Published artifacts

`/dkkb/llms.txt` is the compact human- and LLM-readable entry point. It follows the llms.txt v2 structure with one H1, a project summary, and H2 sections containing canonical links and concise notes.

`/dkkb/dkkb-index.json` is the structured discovery form. It contains a versioned envelope and deterministic entry records with:

- canonical ID, title, description, type, and status;
- category and deployment-base-safe route;
- absolute canonical URL;
- topics and glossary aliases;
- `related` relationships that point to other publicly eligible entries.

The JSON index does not copy article bodies.

## Eligibility

Only reviewed or stable entries that are not sidebar-hidden are included. Draft and deprecated entries are excluded. Relationships to excluded entries are pruned from the generated index.

This eligibility rule is derived from canonical frontmatter. Authors must not maintain a separate AI-only list.

## Determinism

Entries are ordered by category, canonical title, and canonical ID. Arrays derived from relationship IDs are sorted where order has no authored meaning. No generation timestamp is embedded, so two builds from the same repository snapshot produce the same logical content.

Automated tests cover visibility, base-path routes, relationship pruning, ordering, and llms.txt rendering.

## Consumer guidance

Use `llms.txt` to discover likely relevant pages when a compact overview is sufficient. Use `dkkb-index.json` when filtering by type, topic, alias, or relationship is useful. Follow canonical page URLs for the full knowledge entry.

These artifacts are retrieval aids. They are not a second knowledge corpus, an embedding index, or an API backend.

## Format reference

The text artifact follows the llms.txt proposal maintained at `https://llmstxt.org/`.
