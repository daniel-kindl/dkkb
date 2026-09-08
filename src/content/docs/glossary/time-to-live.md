---
title: "Time to live"
description: "A configured lifetime after which cached or distributed state is treated as expired or no longer valid."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
aliases:
  - "TTL"
topics:
  - performance
  - caching
related:
  - performance/caching
sources:
  - type: primary-source
    title: "RFC 1035: Domain Names - Implementation and Specification"
    url: "https://www.rfc-editor.org/rfc/rfc1035"
lastReviewed: "2026-09-08"
---

# Time to live

Time to live, or TTL, is a lifetime attached to data after which the data is considered expired for the relevant protocol or cache.

TTL bounds how long stale state can survive when expiry is the invalidation mechanism. A shorter TTL reduces staleness but increases refresh work.

TTL does not prove freshness before expiry. It only defines the maximum lifetime allowed by that expiry policy.
