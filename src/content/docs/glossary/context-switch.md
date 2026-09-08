---
title: "Context switch"
description: "A transition where execution moves from one thread or process context to another and the system saves and restores required state."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - runtime
  - glossary
related:
  - runtime/context-switches-and-execution-models
sources:
  - type: literature
    title: "Operating Systems: Three Easy Pieces"
    url: "https://pages.cs.wisc.edu/~remzi/OSTEP/"
lastReviewed: "2026-09-08"
---

# Context switch

A context switch transfers a processor from one execution context to another by saving and restoring the state required to resume execution.

Context switches enable multiplexing but consume CPU time and can disturb caches, so excessive runnable concurrency can add overhead.
