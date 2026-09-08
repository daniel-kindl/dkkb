---
title: "Backpressure"
description: "A mechanism that makes upstream producers slow down or stop when downstream capacity is insufficient."
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

# Backpressure

Backpressure is feedback from a constrained consumer to its producers that limits how quickly more work enters the system.

It prevents an overloaded stage from accumulating work without bound. Common mechanisms include bounded queues, flow control, and admission limits.

Backpressure delays or rejects work before uncontrolled queue growth turns capacity pressure into extreme latency or resource exhaustion.
