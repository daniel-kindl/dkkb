# Source and provenance audit

The source audit is a maintenance aid. It does not replace editorial review and it does not assign a numeric quality score to an entry or source.

## Run the audit

Run `pnpm audit:sources` for human-readable output or `pnpm audit:sources -- --json` for deterministic machine-readable output.

The command examines reviewed and stable non-index entries. Draft, deprecated, and index entries are excluded from the audit queue.

## Deterministic metadata findings

The audit reports low-ambiguity metadata inconsistencies separately from editorial recommendations:

- external `literature` or `primary-source` provenance without matching source metadata;
- a recorded source type that is absent from the entry's provenance;
- exact duplicate source metadata within one entry.

These findings are deterministic, but the command is informational. A rule should move into normal validation only after repository evidence shows that the invariant is stable and useful as a hard gate.

## Editorial review queue

Some source-quality questions require context. The audit therefore creates review hints instead of failures for:

- reviewed/stable entries with no source metadata and only personal or derived provenance;
- high-confidence entries supported only by personal experience or derived guidance;
- sources explicitly marked deprecated, obsolete, superseded, or withdrawn;
- URLs that appear to reference an Internet-Draft;
- surveys, reviews, or overviews used without a recorded primary source.

A review hint is not proof that an entry is wrong. For example, a book can be the best source for a durable concept, and a survey can be appropriate for a glossary definition.

## Initial representative audit

The first audit design was checked against representative existing entries:

- `performance/caching` records `primary-source` and `derived-guidance` provenance and an AWS Builders Library primary source. No metadata inconsistency was found.
- `security/threat-modeling` records literature and derived guidance with matching source metadata. No deterministic metadata inconsistency was found.
- `glossary/large-language-model` uses a survey as literature and has no recorded primary source. This is intentionally recorded as an editorial review hint, not an automatic defect. A primary paper should be added only if it materially improves support for the definition.

This sample demonstrates the boundary between machine-checkable consistency and source-quality judgment. The live command remains authoritative for the current repository state.
