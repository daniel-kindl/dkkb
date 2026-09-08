---
title: Heaps and priority queues
description: Retrieve the next highest- or lowest-priority item efficiently without maintaining a fully sorted collection.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - data-structures
  - heaps
  - priority-queues
related:
  - performance/bounded-work
sources:
  - type: literature
    title: "Introduction to Algorithms"
    note: Cormen and coauthors describe binary heaps and priority-queue operations.
lastReviewed: "2026-09-08"
---

# Heaps and priority queues

A priority queue returns the item with the most important priority according to a defined ordering.

A binary heap is a common implementation.

A heap maintains a partial order: the root is the minimum or maximum item, but the full collection is not globally sorted.

## Core operations

For a binary heap with `n` items:

- inspect the highest-priority item: constant time;
- insert an item: logarithmic time;
- remove the highest-priority item: logarithmic time;
- build a heap from an existing sequence: linear time with the standard bottom-up construction.

These costs make a heap useful when the application repeatedly needs the next priority item but does not need sorted access to every item.

## Priority is part of the contract

The comparison rule must define what happens when priorities are equal.

If stable FIFO behavior among equal priorities matters, store an additional sequence value or use a structure that provides the required stability.

Do not assume a heap preserves insertion order for equal keys.

## Common uses

Priority queues appear in:

- schedulers;
- shortest-path and graph algorithms;
- timers and deadline management;
- merge operations;
- bounded top-k selection;
- work queues where urgency differs.

## Not a replacement for a sorted index

A heap is efficient for the next minimum or maximum, but finding an arbitrary ordered range is not its strength.

Use a tree or sorted index when ordered lookup and range traversal are primary requirements.

## Practical guidance

Choose a priority queue when the repeated operation is "give me the next most important item."

Keep the priority immutable while an item is in the structure unless the implementation provides an explicit update operation that restores heap invariants.

Bound queue growth where producers can outpace consumers. A fast priority operation does not make unbounded backlog safe.
