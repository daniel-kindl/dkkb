# AI agent instructions

These rules apply to AI agents that read or modify DKKB.

## Authority

The repository is authoritative. Do not treat generated site output as source data.

Read the relevant policy before a material change:

- `docs/WRITING_STANDARD.md`
- `docs/SOURCE_POLICY.md`
- `docs/CONTENT_MODEL.md`
- `docs/PRESENTATION.md`
- `docs/DIAGRAMS.md`
- `docs/GOVERNANCE.md`
- `docs/ARCHITECTURE.md`

## Content changes

Before you create an entry:

1. Search for an existing entry that covers the same concept.
2. Prefer an update to the canonical entry over duplicate content.
3. Open or use an existing issue when `CONTRIBUTING.md` requires one for the change.
4. Identify the provenance of each material claim.
5. Use primary sources when they are practical and authoritative.
6. Separate established knowledge from personal observations and derived guidance.
7. State uncertainty when evidence is incomplete.
8. Include trade-offs when a recommendation depends on context.
9. Link related canonical entries with valid content IDs when useful.

Never invent a citation, benchmark, incident, quotation, personal experience, or project result.

Do not represent an AI-generated inference as Daniel Kindl's personal experience.

Do not create bookmark dumps or "awesome" lists as knowledge entries.

## Writing

Follow `docs/WRITING_STANDARD.md` and `docs/PRESENTATION.md`.

- Write direct technical English.
- Prefer active voice.
- Use one term for one concept.
- Remove filler and marketing language.
- Do not use an em dash.
- Do not imitate common AI prose patterns.
- Do not add generic introductions or conclusions.
- Use asides only for short secondary information.
- Use fenced code blocks, fenced text file trees, and normal ordered lists instead of MDX-only Starlight components.
- Format DKKB-authored curly-brace code examples with Allman block braces, 4-space indentation, and spaces rather than tab characters.
- Preserve language correctness and meaningful original formatting when the Allman rule does not apply.
- Do not use presentation features only to make an entry look more varied.

## Repository constraints

- Canonical knowledge uses `.md` files only.
- Do not add MDX.
- Do not import Starlight components into canonical knowledge.
- Do not add a backend or database.
- Do not add paid infrastructure as a core dependency.
- Keep dependencies minimal.
- Do not weaken validation to make a failing change pass.
- Do not change top-level taxonomy without clear justification.
- Do not merge a pull request unless the task explicitly authorizes a merge.

## Validation

Run `pnpm check` after a material change.
