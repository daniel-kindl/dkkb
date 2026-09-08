---
title: Asymptotic complexity and Big O
description: Describe how required work grows with input size while keeping constants, input shape, and real measurements in view.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - algorithms
  - complexity
  - big-o
related:
  - performance/measure-before-optimizing
  - performance/bounded-work
  - performance/latency-vs-throughput
sources:
  - type: literature
    title: "Introduction to Algorithms"
    note: Cormen, Leiserson, Rivest, and Stein define asymptotic notation and analyze common algorithm families.
lastReviewed: "2026-09-08"
---

# Asymptotic complexity and Big O

Asymptotic complexity describes how an algorithm's resource use grows as its input becomes large.

Big O gives an upper growth bound up to constant factors beyond some input size. It is useful for comparing scalability, but it is not a measured runtime and does not capture every practical cost.

## Representative growth classes

Common classes include:

- `O(1)`: bounded independently of input size;
- `O(log n)`: grows with the number of times the input can be divided;
- `O(n)`: grows proportionally with the input;
- `O(n log n)`: common for efficient comparison sorting;
- `O(n^2)`: pairwise or nested work over the same input;
- `O(2^n)` or worse: growth that becomes infeasible quickly.

The notation describes growth, not a promise that every `O(n)` implementation is faster than every `O(log n)` implementation at real sizes.

## Worst, average, and expected behavior

One algorithm can have different bounds depending on what case is analyzed.

A hash lookup may have expected constant behavior with good distribution but worse behavior under heavy collisions. Quicksort has strong average behavior but a quadratic worst case without protective choices.

State the case and assumptions instead of quoting one complexity value without context.

## Time and space are separate dimensions

An algorithm can reduce time by using more memory, or reduce memory by recomputing work.

A useful analysis names both when the trade-off matters.

External I/O, cache locality, allocation, parallelism, and network latency can dominate CPU operation counts in production systems.

## Complexity complements profiling

Complexity analysis can reveal that a design will not scale to the target input even before benchmarking.

Profiling shows where time and resources are actually spent at representative sizes and hardware.

Use both. The [measure before optimizing](../performance/measure-before-optimizing.md) guidance owns the empirical side.

## Practical guidance

Estimate the largest realistic input and identify loops, scans, sorts, recursive branches, and repeated lookups that grow with it.

Treat unbounded collection scans and accidental nested work as design risks even when current test data is small.

Use asymptotic notation to reason about growth, then verify the important path with real measurements.
