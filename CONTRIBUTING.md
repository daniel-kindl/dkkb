# Contributing to DKKB

DKKB accepts corrections, new knowledge entries, source improvements, taxonomy changes, and project maintenance changes.

## Before you start

1. Search for an existing canonical entry.
2. Update the existing entry when it already covers the subject.
3. Create a new entry only when it represents a distinct concept, problem, or engineering decision.
4. Read the writing and source policies before you write substantial content.

Use these project documents:

- [Writing standard](docs/WRITING_STANDARD.md)
- [Source policy](docs/SOURCE_POLICY.md)
- [Content model](docs/CONTENT_MODEL.md)
- [Presentation conventions](docs/PRESENTATION.md)
- [Diagram conventions](docs/DIAGRAMS.md)
- [Governance](docs/GOVERNANCE.md)

## When an issue is required

Small corrections do not need a separate issue. Examples include typos, wording corrections, broken links, source improvements, and small clarifications to an existing entry.

Open an issue before work starts when a change adds a substantial canonical entry, adds a top-level category or entry type, changes the taxonomy, changes a writing or source policy, or changes project architecture or tooling.

The issue should define the knowledge gap or project problem before implementation starts.

## Content rules

- Use Markdown files only for canonical knowledge.
- Use lowercase kebab-case file names.
- Add valid YAML frontmatter to each published entry.
- Keep one canonical entry for one concept.
- Link related knowledge instead of copying the same explanation.
- Use canonical content IDs in `related` metadata.
- State context and trade-offs when guidance is conditional.
- Follow the approved Markdown presentation conventions when using asides, code blocks, file trees, procedures, or callouts.
- Use Starlight Markdown asides only for short secondary information.
- Use fenced Markdown code blocks, fenced text file trees, and normal ordered lists instead of MDX-only Starlight components.
- Do not use Starlight component imports or custom icons in canonical entries.
- Prefer Mermaid for technical diagrams when a diagram materially improves understanding.
- Keep essential meaning in prose and do not rely on diagram color alone.
- Do not use a hosted diagram-rendering service for canonical content.
- Do not present personal experience as universal evidence.
- Do not invent citations or source details.
- Do not copy substantial text, diagrams, or other protected material from copyrighted sources.
- Do not create bookmark dumps or "awesome" lists as knowledge entries.
- Do not add MDX unless the repository policy changes first.

## Content Definition of Done

A substantial entry is ready for `reviewed` or `stable` status only when the applicable checks below are satisfied:

- no existing canonical entry already owns the subject;
- the entry states the problem, purpose, or decision it helps with;
- recommendations include relevant context and limits;
- important trade-offs are documented;
- factual technical claims are verified;
- primary sources are preferred when they are available and appropriate;
- personal experience is identified explicitly;
- derived guidance makes its reasoning visible when needed;
- related canonical entries are linked where useful;
- presentation features are purposeful and the entry remains understandable without Starlight-specific styling;
- diagrams, when present, agree with the prose and remain understandable without color alone;
- the text follows the DKKB writing standard;
- the entry remains useful as plain Markdown without the generated website;
- CI passes.

Not every entry needs every article section. Do not add empty sections only to satisfy this checklist.

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
