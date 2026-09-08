---
title: "Load shedding"
description: "The deliberate rejection or dropping of work when accepting it would overload the system."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - reliability
  - performance
related:
  - reliability/load-shedding-and-backpressure
sources:
  - type: literature
    title: "Site Reliability Engineering: Handling Overload"
    url: "https://sre.google/sre-book/handling-overload/"
lastReviewed: "2026-09-08"
---

# Load shedding

Load shedding is the deliberate refusal of some work when the system does not have enough capacity to serve all demand safely.

The goal is to preserve useful service for admitted work instead of letting overload degrade every request.

Load shedding is different from backpressure. Backpressure asks producers to slow down; load shedding rejects or drops work that has already reached an admission boundary.
