---
title: "Circuit breaker"
description: "A reliability mechanism that temporarily stops calls to a failing dependency after failures cross a configured threshold."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - reliability
  - distributed-systems
related:
  - reliability/circuit-breakers
sources:
  - type: primary-source
    title: "Circuit Breaker"
    url: "https://martinfowler.com/bliki/CircuitBreaker.html"
lastReviewed: "2026-09-08"
---

# Circuit breaker

A circuit breaker stops sending normal calls to a dependency after recent failures indicate that continued attempts are unlikely to help.

While open, it fails fast or uses a fallback. After a recovery interval, limited probe traffic can test whether normal calls should resume.

A circuit breaker limits failure amplification. It does not repair the dependency or make unsafe fallbacks correct.
