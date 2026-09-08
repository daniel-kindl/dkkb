---
title: "Rate limit"
description: "A policy that bounds how much work a caller or population may request during a defined interval."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
aliases:
  - "rate limiting"
topics:
  - reliability
  - api-design
related:
  - reliability/load-shedding-and-backpressure
  - performance/bounded-work
sources:
  - type: primary-source
    title: "RFC 6585: Additional HTTP Status Codes"
    url: "https://www.rfc-editor.org/rfc/rfc6585"
lastReviewed: "2026-09-08"
---

# Rate limit

A rate limit bounds how much work a caller, tenant, or population may request during a defined time interval.

Rate limits protect shared capacity and can enforce fairness between callers. An exceeded limit can delay, reject, or otherwise throttle new work.

A rate limit is an admission policy, not a guarantee that admitted work will finish successfully.
