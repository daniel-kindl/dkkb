---
title: "Call stack"
description: "A last-in-first-out region used to track active function calls, return state, and commonly automatic local data."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - runtime
  - glossary
aliases:
  - "stack"
related:
  - runtime/virtual-memory-stack-and-heap
sources:
  - type: literature
    title: "Operating Systems: Three Easy Pieces"
    url: "https://pages.cs.wisc.edu/~remzi/OSTEP/"
lastReviewed: "2026-09-08"
---

# Call stack

A call stack tracks active function calls and the state needed to return from them.

Stack storage is usually scoped to execution and call lifetime; it is distinct from the heap data structure and from dynamically allocated heap memory.
