# DKKB

DKKB is the Daniel Kindl Knowledge Base. It is a public, version-controlled software engineering knowledge base for principles, architecture, patterns, recurring problems, practices, AI, LLM engineering, and personal engineering guidance.

The Git repository is the source of truth. The website is a generated presentation layer.

## Principles

DKKB follows these project rules:

- Markdown is the canonical knowledge format.
- Git history preserves change history. Canonical entries represent the current understanding.
- Guidance must state context, limits, and trade-offs.
- Sourced knowledge, personal experience, experiments, and derived guidance must be distinguishable.
- External material must be summarized in original wording and cited.
- AI-generated inference must never be presented as personal experience.
- The writing style is based on ASD-STE100 principles and adapted to software engineering.
- Em dashes, marketing language, generic AI filler, and unnecessary buzzwords are not allowed.
- The project must remain operable with free static infrastructure.
- The website must not become a dependency of the knowledge itself.

## Content

The initial taxonomy covers:

- principles;
- architecture;
- patterns and anti-patterns;
- recurring engineering problems;
- engineering practices;
- coding and testing;
- reliability, performance, and security;
- databases and API design;
- AI and LLM engineering;
- a personal engineering playbook;
- glossary and references.

## Website

The site uses Astro and Starlight. GitHub Pages hosts the generated static output.

Local development requires Node.js 22.13 or later and pnpm 11.25.0.

```sh
pnpm install
pnpm dev
```

Run the complete quality gate with:

```sh
pnpm check
```

## Contribution

Read [CONTRIBUTING.md](CONTRIBUTING.md) before changing knowledge content. AI agents must also follow [AGENTS.md](AGENTS.md).

Project policies and design decisions are in the [`docs/`](docs/) directory.

## License

Knowledge content and project code use separate licenses. See [LICENSE.md](LICENSE.md) for the scope and terms.
