---
title: "Distributed transaction"
description: "A transaction whose atomic or coordinated outcome spans more than one independent resource or participant."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - distributed-systems
  - glossary
related:
  - distributed-systems/distributed-transactions-and-coordination
sources:
  - type: literature
    title: "Transaction Processing: Concepts and Techniques"
lastReviewed: "2026-09-08"
---

# Distributed transaction

A distributed transaction coordinates one logical outcome across multiple resources or participants.

It adds failure states that do not exist inside one local resource because participants and the coordinator can fail or become unreachable independently.
