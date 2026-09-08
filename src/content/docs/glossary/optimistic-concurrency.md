---
title: "Optimistic concurrency"
description: "A concurrency-control approach that allows work to proceed without exclusive ownership and rejects a write when its assumed state is stale."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "optimistic concurrency control"
  - "OCC"
topics:
  - concurrency
  - databases
related:
  - concurrency/optimistic-concurrency-and-compare-and-set
  - databases/optimistic-vs-pessimistic-concurrency-control
sources:
  - type: literature
    title: "On Optimistic Methods for Concurrency Control"
lastReviewed: "2026-09-08"
---

# Optimistic concurrency

Optimistic concurrency lets actors perform work without holding exclusive ownership, then validates that the state they relied on has not changed before committing.

A common implementation compares a version, timestamp, or expected value in an atomic conditional write.

It works well when conflicts are uncommon. Frequent conflicts can turn validation failures and retries into significant extra work.
