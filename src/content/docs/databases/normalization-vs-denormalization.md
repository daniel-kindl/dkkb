---
title: Normalization versus denormalization
description: Decide between one authoritative copy of each fact and a redundant copy shaped for a read, based on the invariants and access patterns that matter.
type: decision
status: reviewed
confidence: high
provenance:
  - literature
  - primary-source
  - derived-guidance
topics:
  - databases
  - data-modeling
  - correctness
  - performance
related:
  - databases/indexes-and-query-planning
  - databases/transactions-and-consistency-boundaries
  - patterns/separate-current-state-from-observation-history
  - performance/caching
  - problems/n-plus-one-queries
sources:
  - type: primary-source
    title: "A Relational Model of Data for Large Shared Data Banks"
    note: E. F. Codd introduces the relational model and the goal of removing update anomalies through normalization. Communications of the ACM, 1970.
  - type: literature
    title: "A Simple Guide to Five Normal Forms in Relational Database Theory"
    note: William Kent explains the normal forms in practical terms and the anomalies each one removes. Communications of the ACM, 1983.
lastReviewed: "2026-09-05"
---

# Normalization versus denormalization

Normalization stores each fact once in an authoritative place. Denormalization keeps a redundant copy of a fact, usually to serve a read without a join or an aggregation.

Neither is universally correct. The choice depends on which invariants must hold, how the data is read and written, and how much update complexity the system can accept.

## The invariant at stake

A normalized model protects a single-source-of-truth invariant. When a fact lives in exactly one place, an update changes it everywhere at once, and no two copies can disagree.

Redundancy breaks that invariant. Once a fact exists in two places, an update must reach both, or the copies drift. Denormalization is the deliberate decision to accept that risk in exchange for a cheaper read.

## The mechanism at a product-neutral level

Normalization decomposes data so that each non-key attribute depends only on the key of its table. This removes the update anomalies the relational model was designed to prevent:

- Update anomaly: a fact stored in many rows must be changed in all of them, or the rows disagree.
- Insertion anomaly: you cannot record one fact without also supplying unrelated facts.
- Deletion anomaly: removing one row destroys an unrelated fact that lived in the same row.

A normalized read often joins several tables to reassemble what the caller needs. Denormalization pre-joins or pre-aggregates that data into a shape the read can use directly.

The redundant copy is derived data, and derived data needs a rule that keeps it consistent with its source.

## Options

### Normalize

Keep one authoritative copy of each fact and join at read time.

Favor this when writes are frequent, correctness of the single fact matters more than read latency, or the access patterns are varied and not known in advance.

A normalized model is easier to keep correct because there is nothing to synchronize.

### Denormalize

Store a redundant, read-shaped copy of the data.

Favor this when a specific read is hot, the join or aggregation to produce it is expensive, and the underlying data changes rarely relative to how often it is read.

The cost moves to write time and to the mechanism that keeps the copy consistent.

## Trade-offs

- Correctness: normalization removes the drift risk. Denormalization reintroduces it and requires a synchronization rule.
- Read cost: denormalization removes joins and aggregations from the read path. Normalization pays that cost on every read.
- Write cost and complexity: denormalization adds work and code on every write that touches the duplicated fact. Normalization keeps writes simple.
- Latency versus throughput: a denormalized read is faster per request, but the extra write work can lower overall write throughput. The latency versus throughput entry covers this tension.

The decision is not permanent for the whole database. A system can normalize its authoritative tables and denormalize a specific read model on top of them.

## Common failure modes and misleading assumptions

- Denormalizing before a read is proven slow. This adds write complexity for no measured benefit. Confirm the cost first, as the measure before optimizing entry describes.
- Adding a redundant copy without a rule that keeps it consistent. The copies drift, and reads become intermittently wrong.
- Reaching for denormalization when the real problem is a missing index or an N+1 access pattern. The indexes and query planning entry and the N+1 query problem entry cover those cases.
- Over-normalizing a read-heavy path so every request pays for many joins that never change.

## Interaction with application and distributed boundaries

A denormalized copy is derived data, so keeping it correct is a consistency-boundary question. When the source and the copy live in one database, one transaction can update both.

When they live in different stores or services, no single transaction covers them, and the copy becomes eventually consistent. The transactions and consistency boundaries entry covers this reasoning.

A caching layer is a form of denormalization outside the database, with the same staleness and invalidation concerns, as the caching entry describes.

A read model derived from an event stream is another form, where current state is intentionally separated from the history that produces it. The separate current state from observation history entry covers that pattern.

## Conditions that favor each option

Prefer normalization when correctness of each fact is the priority, writes are frequent, or access patterns are not yet known.

Prefer targeted denormalization when a specific read is hot and slow, the data behind it is relatively stable, and the team can commit to a clear rule that keeps the copy consistent with its source.

## Sources

- E. F. Codd. "A Relational Model of Data for Large Shared Data Banks." *Communications of the ACM*, 1970.
- William Kent. "A Simple Guide to Five Normal Forms in Relational Database Theory." *Communications of the ACM*, 1983.
