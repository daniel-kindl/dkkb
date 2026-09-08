---
title: "Memory allocation"
description: "The act of reserving memory for program data from a stack, heap, arena, allocator, or other managed region."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - runtime
  - glossary
related:
  - runtime/memory-allocation-and-garbage-collection
sources:
  - type: literature
    title: "The Garbage Collection Handbook"
lastReviewed: "2026-09-08"
---

# Memory allocation

Memory allocation reserves storage for program data from an appropriate memory region or allocator.

Allocation cost depends on the runtime and allocator, and the associated memory must eventually be reclaimed or released according to its ownership model.
