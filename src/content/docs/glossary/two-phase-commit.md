---
title: "Two-phase commit"
description: "A distributed commit protocol where participants first prepare an outcome and later receive the coordinator's final commit or abort decision."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - distributed-systems
  - glossary
aliases:
  - "2PC"
related:
  - distributed-systems/distributed-transactions-and-coordination
sources:
  - type: literature
    title: "Transaction Processing: Concepts and Techniques"
lastReviewed: "2026-09-08"
---

# Two-phase commit

Two-phase commit, or 2PC, asks participants to prepare before a coordinator issues the final commit or abort decision.

It can provide atomic commitment across participants, but coordinator or participant failure can leave prepared work waiting for the final decision.
