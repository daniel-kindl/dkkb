# Architecture

## Purpose

DKKB is a version-controlled knowledge base. The repository is the source of truth. The website is a generated presentation layer.

## Hard constraints

- Canonical knowledge is Markdown.
- The core project must remain operable with free infrastructure.
- The site must remain static.
- GitHub Pages is the default hosting target.
- The project has no required backend, database, CMS, account system, or hosted search service.
- The repository must remain useful without the website.

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

## Current stack

- Git and GitHub for version control and collaboration
- Markdown for canonical content
- YAML frontmatter for structured metadata
- Astro for static site generation
- Starlight for documentation navigation and presentation
- Pagefind through Starlight for static search
- GitHub Actions for validation and deployment
- GitHub Pages for hosting

## Runtime

The build uses the Node.js version in `.nvmrc` and the pnpm version declared in `package.json`.

CI validates content, Markdown, and the production site before merge. The Pages workflow repeats the same quality gate before deployment.

## Dependency policy

Dependencies are maintenance obligations. Add them only when they solve a concrete requirement better than the existing toolchain or a small local script.

Presentation dependencies must not become requirements for reading or migrating canonical knowledge.

## Portability

Knowledge entries must remain useful as plain Markdown. Avoid framework-specific syntax in canonical content.

If the site generator changes, the knowledge should require little or no migration.

## Change policy

A change to the canonical content format, static-site constraint, infrastructure policy, or top-level taxonomy is an architecture change. The pull request must explain the reason, alternatives, and migration effect.

A new runtime service requires an explicit architecture decision.
