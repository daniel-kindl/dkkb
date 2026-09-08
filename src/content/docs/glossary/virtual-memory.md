---
title: "Virtual memory"
description: "An address-space abstraction that maps process-visible virtual addresses to physical memory or other backing storage."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - runtime
  - glossary
related:
  - runtime/virtual-memory-stack-and-heap
sources:
  - type: literature
    title: "Operating Systems: Three Easy Pieces"
    url: "https://pages.cs.wisc.edu/~remzi/OSTEP/"
lastReviewed: "2026-09-08"
---

# Virtual memory

Virtual memory gives a process an address-space abstraction independent of the exact physical memory layout.

The operating system and hardware translate virtual addresses and enforce mappings, isolation, permissions, and paging behavior.
