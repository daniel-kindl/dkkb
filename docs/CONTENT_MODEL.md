# Content model

Each published knowledge page is a Markdown file under `src/content/docs/`.

## Required frontmatter

Every page must define `title`, `description`, `type`, `status`, and at least one `provenance` value.

Supported entry types are `index`, `principle`, `pattern`, `anti-pattern`, `problem`, `practice`, `concept`, `decision`, `playbook`, `glossary`, and `reference`.

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

Entries can also define `confidence`, `topics`, `related`, `sources`, `lastReviewed`, and `homepage`.

Values in `related` are canonical content IDs. Use the path below `src/content/docs/` without the `.md` suffix. For an `index.md` page, use the directory name. For example:

```yaml
related:
  - principles/composition-over-inheritance
  - decisions/monolith-vs-microservices
```

A related entry must exist. An entry must not reference itself or repeat the same related ID.

## Homepage discovery

The homepage derives discovery content from the docs collection.

Top-level `index` entries become category discovery cards automatically. Reviewed and stable entries with `lastReviewed` can appear in the recently reviewed section. Draft, deprecated, hidden, and index entries are not eligible for homepage promotion.

Use `homepage` only when an entry needs explicit promotion:

```yaml
homepage:
  startHere: true
  featured: true
  order: 10
```

`startHere` selects stable introductory guidance. `featured` selects entries that deserve additional visibility. `order` is a non-negative integer; lower values appear first. Entries with equal order are sorted by title so the result stays deterministic.

Do not maintain a separate homepage link list. The site derives promoted links from canonical content IDs and the configured deployment base path.

## Decision entries

A `decision` entry compares approaches that can each be valid in the right context.

It should normally explain the problem, decision factors, relevant options, trade-offs, failure modes, and the conditions that favor each option. It must not reduce a contextual choice to a universal rule.

## Presentation

Presentation features are optional supporting material. They must not become the only representation of essential knowledge.

Canonical entries can use normal Markdown features, fenced code blocks, fenced text file trees, ordered procedures, Mermaid diagrams, and Starlight Markdown asides according to [presentation conventions](PRESENTATION.md).

Starlight Markdown asides are the only approved Starlight-specific authoring syntax in canonical knowledge. Do not use MDX-only Starlight components in canonical entries.

## Diagrams

Knowledge entries can use Mermaid fenced code blocks for technical diagrams when a visual relationship, sequence, state, or flow is clearer than prose alone.

A diagram must support the written explanation. Essential knowledge must not exist only inside a diagram.

Prefer Mermaid because its source remains plain text, Git can review it, GitHub can render it, and the generated site can render the same source. Use static diagrams only when Mermaid cannot express the subject clearly.

Follow [diagram conventions](DIAGRAMS.md) for accessibility, scope, source handling, and static-asset exceptions.

## Article structure

Substantial entries should explain the concept or problem, its context, important trade-offs, limits, related knowledge, and supporting evidence when these apply. Do not add empty sections only to satisfy a template.
