---
title: "Heap memory"
description: "Process memory used for dynamically allocated objects whose lifetime is not tied directly to one function call."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - runtime
  - glossary
aliases:
  - "heap"
related:
  - runtime/virtual-memory-stack-and-heap
  - runtime/memory-allocation-and-garbage-collection
sources:
  - type: literature
    title: "The Garbage Collection Handbook"
lastReviewed: "2026-09-08"
---

# Heap memory

Heap memory is the region from which programs or runtimes allocate objects with lifetimes that are not bound to one call frame.

It is distinct from the heap priority-queue data structure; allocation and reclamation policy determine fragmentation, latency, and memory pressure.
