---
title: "Scheduler"
description: "The operating-system mechanism and policy that selects runnable execution units for available processors."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - runtime
  - glossary
aliases:
  - "CPU scheduler"
related:
  - runtime/processes-threads-and-scheduling
sources:
  - type: literature
    title: "Operating Systems: Three Easy Pieces"
    url: "https://pages.cs.wisc.edu/~remzi/OSTEP/"
lastReviewed: "2026-09-08"
---

# Scheduler

A scheduler decides which runnable thread or task receives CPU time and where it runs.

Scheduling policy affects latency, fairness, utilization, and context-switch frequency when runnable work exceeds available processors.
