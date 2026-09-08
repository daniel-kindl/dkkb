---
title: "Mutex"
description: "A mutual-exclusion primitive that allows only one holder at a time to enter a protected synchronization boundary."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
aliases:
  - "mutual exclusion lock"
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

# Mutex

A mutex is a synchronization primitive that grants one execution context at a time ownership of a protected boundary.

Programs use a mutex so conflicting operations cannot enter the same critical section concurrently.

A mutex protects an invariant only when every conflicting operation obeys the same locking rule.
