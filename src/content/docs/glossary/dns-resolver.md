---
title: "DNS resolver"
description: "A component that performs or coordinates DNS lookups and returns resolved records or errors to a client."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - networking
  - glossary
aliases:
  - "recursive resolver"
related:
  - networking/dns-resolution
sources:
  - type: primary-source
    title: "RFC 1034: Domain Names - Concepts and Facilities"
    url: "https://www.rfc-editor.org/rfc/rfc1034.html"
lastReviewed: "2026-09-08"
---

# DNS resolver

A DNS resolver accepts a name query and obtains a usable DNS answer, often by consulting caches and authoritative DNS infrastructure.

A recursive resolver performs the upstream resolution work on behalf of a client rather than requiring the client to query each DNS layer directly.
