# Content model

Each published knowledge page is a Markdown file under `src/content/docs/`.

## Required frontmatter

Every page must define `title`, `description`, `type`, `status`, and at least one `provenance` value.

Supported entry types are `index`, `principle`, `pattern`, `anti-pattern`, `problem`, `practice`, `concept`, `playbook`, `glossary`, and `reference`.

Supported status values are `draft`, `reviewed`, `stable`, and `deprecated`.

Git history stores previous versions. Do not create `v2`, `new`, or `final` copies of a canonical entry.

## Provenance

Supported provenance values are:

- `literature`
- `primary-source`
- `personal-experience`
- `experiment`
- `derived-guidance`

`personal-experience` means an observation that Daniel Kindl can substantiate from his own work. AI agents must not assign this provenance based on inference.

## Optional metadata

Entries can also define `confidence`, `topics`, `related`, `sources`, and `lastReviewed`.

## Article structure

Substantial entries should explain the concept or problem, its context, important trade-offs, limits, related knowledge, and supporting evidence when these apply. Do not add empty sections only to satisfy a template.
