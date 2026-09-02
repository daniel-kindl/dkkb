# DKKB

**Daniel Kindl Knowledge Base** is a public, version-controlled knowledge base for software engineering.

DKKB collects knowledge from literature, primary sources, practical experience, experiments, and derived engineering guidance. The repository is the source of truth. The website is a generated view of the repository.

## Scope

DKKB covers topics such as:

- software engineering principles
- software architecture
- design patterns and anti-patterns
- recurring engineering problems
- coding and refactoring
- testing
- reliability and performance
- security
- databases and API design
- AI engineering
- LLM engineering
- personal engineering guidance

The project is not a collection of absolute best practices. Entries must describe context, trade-offs, limits, and evidence where these matter.

## Project principles

- Markdown is the canonical content format.
- Git history preserves change history. Canonical entries describe the current understanding.
- The repository must remain usable without the generated website.
- The core project must remain operable with free infrastructure.
- External claims require traceable sources when a source is available.
- Personal experience must be identified as personal experience.
- AI-assisted contributions follow the same review rules as other contributions.
- Technical writing must follow the DKKB writing standard.

## Website

The site uses Astro and Starlight and is designed for GitHub Pages. It is fully static. There is no backend, database, CMS, account system, or analytics dependency.

After the bootstrap pull request is merged and GitHub Pages is configured to use GitHub Actions, the site will be available at:

`https://daniel-kindl.github.io/dkkb/`

## Repository layout

```text
src/content/docs/    Canonical knowledge entries
config/              Repository validation rules
scripts/             Local and CI validation tools
docs/                Project governance and authoring documentation
.github/              GitHub workflows and contribution templates
```

The published knowledge taxonomy is under `src/content/docs/`.

## Local development

Requirements:

- Node.js 22.12.0 or later
- pnpm 11.25.0

```sh
corepack enable
pnpm install
pnpm check
pnpm dev
```

`pnpm check` is the local equivalent of the main CI quality gate.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before you make a contribution. AI agents must also follow [AGENTS.md](AGENTS.md).

Project policies:

- [Architecture](docs/ARCHITECTURE.md)
- [Content model](docs/CONTENT_MODEL.md)
- [Governance](docs/GOVERNANCE.md)
- [Source policy](docs/SOURCE_POLICY.md)
- [Writing standard](docs/WRITING_STANDARD.md)
- [Roadmap](ROADMAP.md)

## License

See [LICENSE.md](LICENSE.md). Knowledge content and project code use separate licenses.
