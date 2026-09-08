---
title: Amortized complexity
description: Spread occasional expensive operations across a sequence of cheap operations when the data structure guarantees that pattern.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - algorithms
  - amortized-analysis
related:
  - performance/bounded-work
  - performance/measure-before-optimizing
sources:
  - type: literature
    title: "Introduction to Algorithms"
    note: The amortized-analysis chapters describe aggregate, accounting, and potential methods.
lastReviewed: "2026-09-08"
---

# Amortized complexity

Amortized analysis bounds the average cost per operation across a defined sequence of operations without relying on a probability distribution over inputs.

It is useful when most operations are cheap and occasional operations are expensive, but the expensive operation cannot happen too often.

## Dynamic-array growth

A common example is a dynamic array.

Most appends write one new element. When capacity is exhausted, the array allocates larger storage and copies existing elements.

That one growth append is linear in the current size.

If capacity grows geometrically, however, each element is copied only a bounded number of times across many appends. The sequence of appends therefore has amortized constant cost per append.

## Amortized is not worst-case latency

An amortized bound does not mean each individual operation is cheap.

A latency-sensitive request can still encounter the expensive resize, compaction, rehash, or cleanup operation.

This distinction matters for real-time or tail-latency-sensitive systems.

## Common uses

Amortized reasoning appears in:

- dynamic arrays;
- hash-table resizing;
- union-find structures;
- batched cleanup;
- some persistent and functional data structures;
- credit-based or potential-based scheduling designs.

The guarantee depends on the structure's invariant. Do not call an observed average "amortized" unless the sequence cost is bounded by the design.

## Hidden debt

Some systems make current operations cheap by deferring work.

If deferred work can accumulate without a structural bound, the system has not earned an amortized guarantee. It has created debt that may surface later as a pause, backlog, or maintenance spike.

## Practical guidance

Use amortized complexity to reason about total work over a sequence, then separately evaluate the worst individual operation when latency or resource spikes matter.

When documenting an amortized guarantee, state what triggers the expensive operation and why repeated expensive operations are structurally bounded.
