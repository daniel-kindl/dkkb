---
title: "Thread"
description: "An execution unit scheduled within a process that normally shares the process address space and resources with sibling threads."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - runtime
  - glossary
related:
  - runtime/processes-threads-and-scheduling
  - concurrency/locks-mutexes-and-critical-sections
sources:
  - type: literature
    title: "Operating Systems: Three Easy Pieces"
    url: "https://pages.cs.wisc.edu/~remzi/OSTEP/"
lastReviewed: "2026-09-08"
---

# Thread

A thread is a schedulable execution unit inside a process.

Threads in one process normally share memory, making communication cheap but requiring synchronization when mutable state is accessed concurrently.
