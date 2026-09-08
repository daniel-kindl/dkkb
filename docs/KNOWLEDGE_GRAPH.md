# DKKB knowledge connectivity

DKKB treats authored knowledge relationships as part of content quality. A reviewed or stable canonical entry should normally connect to other knowledge through a meaningful relationship.

## What counts as a relationship

The orphan report derives relationships from canonical repository data:

- authored Markdown links between visible canonical entries;
- canonical IDs in `related` frontmatter.

A relationship can be incoming or outgoing. Either direction is enough to make an entry connected.

## What is an orphan

An orphan is a reviewed or stable, visible, non-index entry with no incoming or outgoing relationship in the derived graph.

An orphan is not automatically incorrect. It is a discovery and integration signal. Review the entry and either add a meaningful relationship or keep it standalone when that is intentional.

## Intentional exclusions

The report excludes:

- draft entries;
- deprecated entries;
- entries hidden from the sidebar;
- entries tagged `system-page`;
- index pages and generated category listings;
- navigation chrome;
- plain-text term mentions;
- links inside code spans or fenced code blocks;
- image links.

Index pages are excluded because category ownership is navigation structure, not evidence that two knowledge entries explain related concepts.

## Running the report

Run:

```sh
pnpm report:orphans
```

For stable machine-readable output, run:

```sh
pnpm report:orphans -- --json
```

The command is informational. It exits successfully when orphans exist so the report can be adopted before DKKB has evidence that orphan detection should become a hard quality gate.
