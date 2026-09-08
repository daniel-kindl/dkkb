---
title: "Critical section"
description: "A region of code that accesses shared state and must obey a synchronization rule to preserve an invariant."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - concurrency
  - synchronization
related:
  - concurrency/locks-mutexes-and-critical-sections
sources:
  - type: primary-source
    title: "Cooperating Sequential Processes"
    url: "https://www.cs.utexas.edu/~EWD/transcriptions/EWD01xx/EWD123.html"
lastReviewed: "2026-09-08"
---

# Critical section

A critical section is code that accesses shared state under a rule that prevents unsafe concurrent execution.

Mutual exclusion is one common way to protect a critical section. The protected boundary should be large enough to preserve the invariant but no larger than necessary.

The important property is the state transition being protected, not the syntax of the code block.
