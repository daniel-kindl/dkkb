# Contributing to DKKB

DKKB accepts corrections, new knowledge entries, source improvements, taxonomy changes, and project maintenance changes.

## Before you start

1. Search for an existing canonical entry.
2. Update the existing entry when it already covers the subject.
3. Create a new entry only when it represents a distinct concept or problem.
4. Read the writing and source policies before you write substantial content.

Use these project documents:

- [Writing standard](docs/WRITING_STANDARD.md)
- [Source policy](docs/SOURCE_POLICY.md)
- [Content model](docs/CONTENT_MODEL.md)
- [Governance](docs/GOVERNANCE.md)

## Content rules

- Use Markdown files only for canonical knowledge.
- Use lowercase kebab-case file names.
- Add valid YAML frontmatter to each published entry.
- Keep one canonical entry for one concept.
- Link related knowledge instead of copying the same explanation.
- State context and trade-offs when guidance is conditional.
- Do not present personal experience as universal evidence.
- Do not invent citations or source details.
- Do not copy substantial text from copyrighted sources.
- Do not add MDX unless the repository policy changes first.

## Change process

1. Create a branch from the current `main` branch.
2. Make one coherent change.
3. Run `pnpm check`.
4. Open a pull request.
5. Resolve review comments and required checks.
6. Squash merge after approval.

Direct changes to `main` are not part of the normal workflow.

## Dependencies

Do not add a dependency unless it provides a clear project requirement that cannot be met reasonably with the current toolchain or a small local script.

Do not add a backend, database, CMS, account system, hosted search service, or paid infrastructure as a core dependency without an explicit architecture decision.
