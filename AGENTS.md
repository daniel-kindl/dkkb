# AI agent instructions

These rules apply to AI agents that read or modify DKKB.

## Authority

The repository is authoritative. Do not treat generated site output as source data.

Read the relevant policy before a material change:

- `docs/WRITING_STANDARD.md`
- `docs/SOURCE_POLICY.md`
- `docs/CONTENT_MODEL.md`
- `docs/GOVERNANCE.md`
- `docs/ARCHITECTURE.md`

## Content changes

Before you create an entry:

1. Search for an existing entry that covers the same concept.
2. Prefer an update to the canonical entry over duplicate content.
3. Identify the provenance of each material claim.
4. Use primary sources when they are practical and authoritative.
5. Separate established knowledge from personal observations and derived guidance.
6. State uncertainty when evidence is incomplete.
7. Include trade-offs when a recommendation depends on context.

Never invent a citation, benchmark, incident, quotation, personal experience, or project result.

Do not represent an AI-generated inference as Daniel Kindl's personal experience.

## Writing

Follow `docs/WRITING_STANDARD.md`.

- Write direct technical English.
- Prefer active voice.
- Use one term for one concept.
- Remove filler and marketing language.
- Do not use an em dash.
- Do not imitate common AI prose patterns.
- Do not add generic introductions or conclusions.

## Repository constraints

- Canonical knowledge uses `.md` files only.
- Do not add MDX.
- Do not add a backend or database.
- Do not add paid infrastructure as a core dependency.
- Keep dependencies minimal.
- Do not weaken validation to make a failing change pass.
- Do not change top-level taxonomy without clear justification.
- Do not merge a pull request unless the task explicitly authorizes a merge.

## Validation

Run `pnpm check` after a material change.
