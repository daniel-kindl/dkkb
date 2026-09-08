---
title: Sorting trade-offs and stability
description: Choose sorting behavior from comparison cost, memory, stability, input shape, and whether full ordering is actually required.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - algorithms
  - sorting
  - stability
related:
  - performance/measure-before-optimizing
  - performance/bounded-work
sources:
  - type: literature
    title: "Introduction to Algorithms"
    note: The sorting chapters analyze comparison sorts, linear-time special cases, stability, and lower bounds.
lastReviewed: "2026-09-08"
---

# Sorting trade-offs and stability

Sorting puts elements into an order defined by a comparison or key.

For general comparison sorting, efficient algorithms typically require `O(n log n)` comparisons in the average or worst case, depending on the algorithm.

The right choice also depends on memory, stability, input distribution, and whether the whole collection must be sorted.

## Stability

A stable sort preserves the original relative order of elements that compare equal under the sort key.

This matters when data has already been ordered by another key or when equal values must keep an externally meaningful order.

If stability is not required, an unstable sort can be acceptable and may have other implementation advantages.

## Common algorithm trade-offs

Merge sort offers predictable `O(n log n)` comparison behavior and is naturally stable, but typical array implementations need additional memory.

Quicksort is often fast in memory and can operate largely in place, but naive pivot selection can produce quadratic behavior on unfavorable input.

Heapsort provides `O(n log n)` worst-case behavior with small extra storage but usually has weaker locality than well-tuned alternatives.

Production standard libraries often use hybrid algorithms rather than one textbook algorithm.

## Full sorting can be unnecessary

If the task needs only the smallest item, largest item, top `k` items, or median-like selection, fully sorting the entire collection may do extra work.

A heap, selection algorithm, bounded priority queue, or database query with an appropriate index can be a better fit.

## Comparison cost matters

A comparison may be more expensive than an integer operation. Locale-sensitive strings, compound domain comparisons, or remote/lazy data access can make the comparator dominate total cost.

Precompute stable sort keys when that removes repeated expensive work and the additional memory is justified.

## Practical guidance

Use the language/runtime library sort by default unless its contract does not meet the requirement.

State whether order must be stable, whether full ordering is needed, and whether input size can grow without a bound.

Profile before replacing a maintained library sort with a custom implementation.
