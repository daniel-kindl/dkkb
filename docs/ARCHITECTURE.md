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
- Mermaid syntax for source-controlled technical diagrams in Markdown
- Astro for static site generation
- Starlight for documentation navigation and presentation
- `astro-mermaid` and Mermaid for local client-side diagram rendering
- Pagefind through Starlight for static search
- GitHub Actions for validation and deployment
- GitHub Pages for hosting

## Runtime

The build uses the Node.js version in `.nvmrc` and the pnpm version declared in `package.json`.

CI validates content, Markdown, and the production site before merge. The Pages workflow repeats the same quality gate before deployment.

Mermaid diagrams are bundled with the site and render in the browser. DKKB does not depend on a hosted diagram-rendering service.

## Dependency policy

Dependencies are maintenance obligations. Add them only when they solve a concrete requirement better than the existing toolchain or a small local script.

Presentation dependencies must not become requirements for reading or migrating canonical knowledge.

## Portability

Knowledge entries must remain useful as plain Markdown. Avoid framework-specific syntax in canonical content.

Mermaid fenced code blocks are permitted because the diagram source remains plain text and GitHub renders the same syntax. Diagrams must supplement the written explanation rather than become the only representation of essential knowledge.

Starlight Markdown asides are a narrow exception to the framework-specific syntax preference. Their source is plain text, the contained information must remain understandable without Starlight styling, and they can be transformed mechanically if the site generator changes.

MDX-only Starlight components such as `<Code>`, `<FileTree>`, `<Icon>`, and `<Steps>` are not permitted in canonical knowledge. Use the portable Markdown forms defined in `docs/PRESENTATION.md` instead.

If the site generator changes, the knowledge should require little or no migration.

## Change policy

A change to the canonical content format, static-site constraint, infrastructure policy, or top-level taxonomy is an architecture change. The pull request must explain the reason, alternatives, and migration effect.

A new runtime service requires an explicit architecture decision.
