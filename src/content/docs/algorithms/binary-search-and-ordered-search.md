---
title: Binary search and ordered search
description: Cut a monotonic search space in half only when ordering and boundary invariants make the discarded half provably irrelevant.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - algorithms
  - binary-search
  - ordering
related:
  - performance/bounded-work
sources:
  - type: literature
    title: "Programming Pearls"
    note: Bentley uses binary search to show how small boundary mistakes can break a simple logarithmic algorithm.
  - type: literature
    title: "Introduction to Algorithms"
    note: Binary search is analyzed as logarithmic search over ordered data.
lastReviewed: "2026-09-08"
---

# Binary search and ordered search

Binary search repeatedly removes half of a search space by using an ordering or monotonic predicate.

Its logarithmic behavior comes from that halving. Without the ordering invariant, discarding half the candidates is not justified.

## Preconditions

Classic binary search needs data sorted by the same comparison used by the search.

A generalized binary search can operate on a monotonic predicate: once the predicate changes from false to true, it does not change back over the search interval.

Examples include finding:

- an exact key in sorted data;
- the first value greater than or equal to a target;
- the last acceptable capacity under a monotonic constraint;
- a boundary between passing and failing configurations.

## Boundary errors are the main risk

The hard part is usually not the midpoint calculation. It is preserving the interval invariant after each comparison.

Define whether the search interval is closed, half-open, or another form, then update the lower and upper bounds consistently.

Off-by-one errors can skip the target, loop forever, or read outside the valid range.

## Search cost can hide preparation cost

Binary search is `O(log n)` after ordered data exists.

Sorting unsorted data just to perform one search usually costs more than a linear scan.

The value appears when order already exists or when many searches amortize the cost of maintaining it.

## Storage behavior matters

Binary search over a contiguous in-memory array has good practical properties.

Applying the same abstract algorithm through an expensive random-access interface can produce poor real performance even though the comparison count remains logarithmic.

## Practical guidance

Use binary search when you can state the order or monotonic invariant precisely.

Test empty input, one-element input, missing targets, duplicate values, and both boundaries.

For database queries, prefer the database's index and query planner rather than reproducing binary search in application code over data that the database already owns.
