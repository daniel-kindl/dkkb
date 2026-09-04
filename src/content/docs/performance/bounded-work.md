---
title: Bounded work
description: Place explicit limits on batch size, concurrency, queue depth, and scan range so one operation cannot consume unbounded resources.
type: principle
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - performance
  - reliability
  - capacity
related:
  - reliability/load-shedding-and-backpressure
  - problems/n-plus-one-queries
  - performance/caching
  - performance/latency-vs-throughput
sources:
  - type: literature
    title: "Release It! Design and Deploy Production-Ready Software"
    note: Michael Nygard describes bulkheads and bounded resource pools that keep one failing or expensive operation from consuming all available capacity.
lastReviewed: "2026-09-04"
---

# Bounded work

An operation should have an explicit, enforced limit on the resources it may consume, such as batch size, concurrency, queue depth, result set size, or scan range.

Without a bound, one request, one job, or one growing data set can consume resources in proportion to input size that the system did not plan for.

## Context

Bounded work matters wherever the size of an input is not controlled by the system itself, such as user-provided queries, growing collections, external event volume, or data that accumulates over time.

A limit that was safe when a table or a collection was small can become a performance or availability problem once the data grows past the assumption that was never written down.

## Where unbounded work appears

Common examples include:

- a query without a page size limit that returns every matching row;
- a loop that issues one dependent call per item in an unbounded collection, as in the N+1 query problem;
- a queue or buffer with no maximum depth, which can grow until memory is exhausted;
- unbounded concurrency, where every incoming request starts new work with no admission limit;
- a full table or full collection scan where an index or a bounded range would suffice.

:::caution[A limit that was safe at launch can silently expire]
A page size, a batch limit, or a concurrency cap chosen against early data volume can stop being safe as the system grows. Revisit bounds when volume or usage pattern changes materially.
:::

## Benefits

An explicit bound makes the worst-case cost of an operation predictable, which makes capacity planning, latency budgets, and failure analysis tractable.

A bounded operation degrades in a controlled way, such as returning a partial page or rejecting excess work, instead of failing unpredictably when a limit is silently exceeded.

## Failure modes

Ignoring bounds can turn a rare large input into an incident.
A single expensive query, an unusually large upload, or a much larger batch than usual can exhaust memory, saturate a database, or stall other work sharing the same resource.

Setting a bound arbitrarily, without a stated resource or latency budget behind it, can reject legitimate work or hide a real capacity problem behind an opaque limit.

## Trade-offs

A limit that is too strict rejects or truncates legitimate work, which can require pagination, multiple requests, or retries that add complexity for callers.

A limit that is too generous fails to protect the resource it was meant to bound, and provides a false sense of safety.

Bounding work is not free: enforcing pagination, batching, or a concurrency limit adds code paths and can require callers to handle partial results.

## Decision test

Before accepting an operation whose cost scales with an external input, ask:

1. What is the maximum plausible size of this input today, and how will it grow?
2. Which resource does the worst case consume, and what is its available capacity?
3. What should happen when the limit is reached: reject, truncate, paginate, or queue?
4. Is the chosen limit documented so a future change to the input can be evaluated against it?

## Sources

- Michael Nygard. *Release It! Design and Deploy Production-Ready Software*. Pragmatic Bookshelf, 2018.
