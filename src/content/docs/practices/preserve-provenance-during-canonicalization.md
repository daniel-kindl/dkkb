---
title: Preserve provenance during canonicalization
description: Keep source and transformation context when external values are merged into a canonical model.
type: practice
status: draft
confidence: medium
provenance:
  - derived-guidance
topics:
  - data-modeling
  - provenance
  - canonicalization
  - external-integrations
related: []
lastReviewed: "2026-09-03"
---

# Preserve provenance during canonicalization

Canonicalization produces an application-owned value from one or more source values.

Do not discard the information needed to explain where that value came from, when it was observed, or how it was selected.

## Keep source values distinct from canonical values

A canonical field can equal a source field without being the same piece of information.

The source value answers what a provider reported. The canonical value answers what the application currently accepts as its domain value.

Keep enough metadata to distinguish the two.

Useful provenance can include:

- source or provider identity;
- source record identifier;
- original source value when retention is permitted;
- observation or retrieval time;
- transformation or normalization rule;
- canonicalization decision time;
- confidence or review state when the domain uses one.

Not every field needs every item. Choose the smallest provenance that still supports the required audit and reconciliation work.

## Preserve disagreement

Two sources can report different values for the same canonical field.

Do not erase the losing value merely because a canonicalization rule selected another one.

The application may need that disagreement later to:

- re-evaluate a source-priority rule;
- detect provider changes;
- investigate a bad merge;
- explain a public value;
- repair canonical data after a mapping correction.

Canonicalization should select a value without pretending that disagreement never existed.

## Make transformations visible

Normalization can change data before canonicalization.

Examples include case folding, punctuation removal, unit conversion, identifier mapping, date normalization, or classification mapping.

Record the transformation rule or version when reproducing the canonical result later matters.

A value that cannot be traced back through its transformations can be difficult to debug even when its final form appears reasonable.

## Choose provenance granularity deliberately

Provenance can exist at several levels:

- record level;
- field level;
- relationship level;
- observation level.

Record-level provenance is simpler but can be too coarse when one canonical record combines fields from several sources.

Field-level provenance is more precise but increases storage and implementation cost.

Use the granularity required by the decisions the system must explain.

## Separate provenance from current source priority

A source can be preferred today without being permanently authoritative.

Do not encode current source priority by deleting other source values or by making provenance depend on the current winner.

Keep provenance stable enough that a future rule can recompute the canonical value from retained evidence when practical.

## Handle corrections explicitly

A source record can be wrong. An identity mapping can also be wrong.

When correcting canonical data, preserve enough information to distinguish:

- a changed source value;
- a changed canonicalization rule;
- a changed provider-to-canonical mapping;
- a manual correction.

These causes have different implications for downstream repair.

## Failure modes

### Canonical fields overwrite source evidence

The system keeps only the winner. Later reconciliation cannot determine whether a provider changed or the canonicalization rule changed.

### Provenance exists only at record level

A record combines fields from several providers, but all fields appear to come from one source.

### Normalization is invisible

A canonical value differs from the raw source, but the system cannot explain which transformation produced the difference.

### Provenance becomes an unbounded copy of every payload

The system stores complete provider responses forever even though only a small subset is needed for reconciliation or audit.

## When detailed provenance is unnecessary

Do not build field-level lineage for data that has one authoritative source, simple transformations, and no audit or reconciliation requirement.

A source identifier and observation time can be sufficient for many systems.

Add detail when multiple sources, policy decisions, transformations, or later recomputation make the origin of a canonical value important.

## Practical rule

Canonicalize the value without erasing the evidence used to create it.

Keep enough provenance to explain, reconcile, and correct canonical state without turning provenance into uncontrolled data duplication.
