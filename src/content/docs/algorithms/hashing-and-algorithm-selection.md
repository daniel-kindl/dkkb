---
title: Hashing and algorithm selection
description: Select algorithms and supporting structures together from required operations, input bounds, ordering, and failure behavior.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - algorithms
  - hashing
  - algorithm-selection
related:
  - performance/measure-before-optimizing
  - performance/bounded-work
  - databases/indexes-and-query-planning
sources:
  - type: literature
    title: "Introduction to Algorithms"
    note: Algorithm analysis throughout the text shows how data representation and algorithm choice jointly determine operation costs.
lastReviewed: "2026-09-08"
---

# Hashing and algorithm selection

An algorithm rarely operates independently of its data representation.

The same task can have very different costs depending on whether the supporting data is a sequence, hash-based lookup structure, ordered tree, heap, graph, or persisted index.

## Hashing turns comparison into bucket selection

Hashing maps a key to a compact hash value that helps choose where to look for the key.

With good distribution and a bounded load factor, a hash-based lookup can provide expected constant-time exact-key access.

That makes hashing attractive for membership tests, deduplication, caches, symbol tables, and joins implemented in memory.

It does not provide sorted range traversal by itself.

## Start from required operations

Before choosing a structure or algorithm, list the operations that dominate:

- exact lookup;
- prefix lookup;
- ordered range scan;
- minimum/maximum extraction;
- insertion and deletion;
- sequential traversal;
- nearest or graph-neighbor exploration;
- top-k selection;
- deduplication.

A structure optimized for one operation can make another operation expensive.

## Input bounds change acceptable choices

An `O(n^2)` approach can be simple and correct for a collection that is structurally limited to ten items.

The same approach is dangerous when a user, table, or network response can grow to millions of items.

Boundedness is therefore part of algorithm selection, not only a later performance concern.

## Storage owners often already have an algorithm

A database index and query planner can execute search, join, sorting, and range operations close to the data.

Loading all rows into application memory to reproduce those operations can turn bounded indexed work into an unbounded scan.

Use [query planning](../glossary/query-plan.md) and index-aware database operations where the database owns the collection.

## Practical guidance

Choose algorithms and structures as one design decision.

Prefer the simplest combination that satisfies correctness and expected bounds. Then use [measurement](../performance/measure-before-optimizing.md) to verify the path that matters in production.

When the input is externally controlled, include the worst allowed size in the design review rather than relying on today's typical sample size.
