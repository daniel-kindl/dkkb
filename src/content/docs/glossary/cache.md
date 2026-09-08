---
title: "Cache"
description: "A stored copy of a result that can satisfy later reads without repeating the original computation or fetch."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - performance
  - caching
related:
  - performance/caching
sources:
  - type: primary-source
    title: "Caching challenges and strategies"
    url: "https://aws.amazon.com/builders-library/caching-challenges-and-strategies/"
lastReviewed: "2026-09-08"
---

# Cache

A cache stores a reusable copy of data or a computed result so later work can avoid repeating an expensive operation.

Caches can reduce latency and source load, but they introduce staleness, eviction, and invalidation rules. A cache is not the source of truth unless the system explicitly defines it that way.

Do not confuse a cache with durable storage. A cache is normally safe to discard and rebuild from another authority.
