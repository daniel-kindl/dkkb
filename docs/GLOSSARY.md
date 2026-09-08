# Glossary authoring and linking policy

## Purpose

The technical glossary gives advanced software-engineering terms a short definition and one stable canonical route.

Glossary entries answer: **What does this term mean?**

Normal DKKB entries answer: **How should an engineer reason about or use this concept?**

Do not copy a full canonical article into the glossary.

## Curated vocabulary growth

The glossary was established with an initial 40-term engineering seed and then expanded with 60 terms harvested from the reviewed distributed-systems, networking, messaging, runtime, and application-security foundations.

That second wave brings the glossary to 100 canonical terms. The count is an outcome of the current knowledge base, not a quota. Future terms must still be justified by actual DKKB usage or by a clear comprehension need.

Prefer extending an existing canonical term with an alias when a new spelling, acronym, or synonym does not represent a distinct concept.

## One term, one page

Create each glossary term as one Markdown page under `src/content/docs/glossary/` with `type: glossary`.

Use a durable lowercase kebab-case file name. The file path is the canonical glossary route.

Before adding a term, search glossary titles and aliases. Update the existing page when the term already resolves to one canonical entry.

## Entry shape

A glossary page should normally contain:

1. one concise definition;
2. a short explanation of why the term matters, when useful;
3. a common confusion or nearby term, when it improves precision;
4. `related` links to deeper DKKB entries;
5. appropriate provenance and sources.

Keep the page short. A glossary entry does not need the full trade-off and failure-mode structure used by substantial engineering articles.

## Aliases

Use `aliases` for abbreviations, synonyms, or alternate names that should resolve to the same term.

```yaml
aliases:
  - LLM
```

Alias matching is case-insensitive and normalizes surrounding and repeated whitespace.

Do not add an alias that duplicates the canonical title. Do not reuse a title or alias for another glossary entry.

The validator treats glossary titles and aliases as one shared namespace.

## Linking from normal entries

Link the first meaningful occurrence of an advanced technical term when a glossary definition would help the intended reader.

Keep the link in canonical Markdown. Do not rely on generated-site rewriting.

Do not link every repeated occurrence. Avoid glossary-link noise in headings, code, URLs, and text that is already part of another link.

Ordinary software vocabulary does not require a glossary link only because a glossary page exists.

## When a full DKKB entry also exists

A term can have both a glossary definition and a full canonical entry.

Use the glossary link when the reader needs the term definition. Use the full entry when the sentence asks the reader to understand design guidance, trade-offs, failure modes, or operational practice.

The glossary page should use `related` metadata to point to the deeper entry when one exists.

This keeps one short vocabulary definition and one deeper knowledge owner instead of two competing articles.

## Manual linking policy

Authors add glossary links deliberately during review.

DKKB does not automatically rewrite text or hard-fail on every unlinked known term. Reliable detection must distinguish headings, code, existing links, ordinary vocabulary, plurals, and context before it can become a useful warning.

A future warning is acceptable only when its false-positive rate is low enough that authors do not learn to ignore it.

## Review checklist

Before publishing a glossary entry, check:

- the term does not already have a canonical glossary page;
- aliases do not conflict with another title or alias;
- the definition is concise and technically correct;
- deeper guidance stays in normal DKKB entries;
- related full entries are linked when they exist;
- sources support the definition;
- first meaningful glossary links in edited knowledge pages are useful rather than repetitive;
- `pnpm check` passes.
