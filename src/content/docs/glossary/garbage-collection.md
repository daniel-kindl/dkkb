---
title: "Garbage collection"
description: "Automatic memory reclamation that identifies objects no longer reachable or otherwise live and recovers their storage."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - runtime
  - glossary
aliases:
  - "GC"
related:
  - runtime/memory-allocation-and-garbage-collection
sources:
  - type: literature
    title: "The Garbage Collection Handbook"
lastReviewed: "2026-09-08"
---

# Garbage collection

Garbage collection, or GC, automatically reclaims memory that the runtime determines is no longer live.

GC reduces manual lifetime management but introduces its own CPU, memory, latency, and tuning trade-offs.
