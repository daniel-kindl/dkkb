# Architecture

DKKB uses Git as the authoritative data store and Markdown as the canonical knowledge format.

## Data flow

```text
Markdown knowledge
      |
      v
Git repository
      |
      +-- GitHub rendering
      +-- Astro and Starlight
      |        |
      |        v
      |   static website
      |        |
      |        v
      |   GitHub Pages
      |
      +-- future read-only consumers
```

The static site is a presentation layer. It must not become the only way to read or interpret core knowledge.

## Runtime

The build uses the Node.js version in `.nvmrc` and the pnpm version declared in `package.json`.

CI validates content, Markdown, and the production site before merge. The Pages workflow repeats the same quality gate before deployment.

## Boundaries

The project has no application backend. It has no persistent database, account system, CMS, or runtime API.

The repository can add static build tooling when it improves navigation, validation, search, or presentation. A new runtime service requires an explicit architectural decision.

## Portability

Knowledge entries must remain useful as plain Markdown. Avoid framework-specific syntax in canonical content.

If the site generator changes, the knowledge should require little or no migration.
