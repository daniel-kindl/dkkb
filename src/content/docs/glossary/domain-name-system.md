---
title: "Domain Name System"
description: "The distributed naming system that maps hierarchical domain names to records such as IP addresses and service metadata."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - networking
  - glossary
aliases:
  - "DNS"
related:
  - networking/dns-resolution
sources:
  - type: primary-source
    title: "RFC 1034: Domain Names - Concepts and Facilities"
    url: "https://www.rfc-editor.org/rfc/rfc1034.html"
lastReviewed: "2026-09-08"
---

# Domain Name System

The Domain Name System, or DNS, is the distributed hierarchical system used to resolve domain names into records such as addresses and service metadata.

DNS answers are cached and time-bounded, so resolution behavior includes freshness, negative caching, delegation, and failure modes.
