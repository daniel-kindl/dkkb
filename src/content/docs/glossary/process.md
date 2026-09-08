---
title: "Process"
description: "An operating-system resource and isolation container for a running program, normally with its own virtual address space and one or more threads."
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
sources:
  - type: literature
    title: "Operating Systems: Three Easy Pieces"
    url: "https://pages.cs.wisc.edu/~remzi/OSTEP/"
lastReviewed: "2026-09-08"
---

# Process

A process is an operating-system container for a running program and its resources.

Processes normally provide address-space and failure isolation stronger than threads within one process, at the cost of explicit inter-process communication.
