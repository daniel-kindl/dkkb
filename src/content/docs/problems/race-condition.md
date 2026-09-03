---
title: Race condition
description: System behavior depends on the relative timing or interleaving of concurrent operations.
type: problem
status: draft
confidence: high
provenance:
  - literature
  - derived-guidance
topics: [concurrency, correctness]
related: []
sources:
  - type: literature
    title: "The Art of Multiprocessor Programming"
lastReviewed: "2026-09-03"
---

# Race condition

A race condition exists when correctness depends on which concurrent operation happens first.

## Symptoms

Failures are intermittent, load-dependent, or difficult to reproduce. Lost updates, duplicated work, invalid state transitions, and stale decisions are common outcomes.

## Detection

Use stress tests, deterministic concurrency tests where possible, tracing with operation identifiers, and review of shared mutable state. Reproduce the invariant that was violated rather than relying only on timing.

## Mitigation

Protect shared state with an appropriate synchronization or serialization mechanism. Database transactions, optimistic concurrency control, locks, queues, immutable state, or idempotent operations can each fit different boundaries.

## Trade-offs

Stronger serialization can reduce throughput or increase contention. Lock-free or highly concurrent designs can improve throughput while increasing reasoning cost.

Do not add synchronization without defining the invariant that it protects.

## Sources

- Maurice Herlihy and Nir Shavit. *The Art of Multiprocessor Programming*.
