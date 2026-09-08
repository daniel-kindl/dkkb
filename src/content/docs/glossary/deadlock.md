---
title: "Deadlock"
description: "A state in which participants wait on one another in a dependency cycle and none can make progress."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - concurrency
  - reliability
related:
  - concurrency/locks-mutexes-and-critical-sections
sources:
  - type: literature
    title: "Deadlock Avoidance in Computer Systems"
lastReviewed: "2026-09-08"
---

# Deadlock

Deadlock occurs when participants form a waiting cycle in which each needs a resource or action held by another participant in the same cycle.

No participant in the cycle can make progress without an external intervention or a broken wait condition.

Consistent lock ordering, avoiding nested ownership, or deadlock detection can address different forms of the problem.
