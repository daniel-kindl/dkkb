---
title: "Content delivery network"
description: "A geographically distributed delivery layer that serves content from locations closer to clients or from cached edge copies."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - networking
  - glossary
aliases:
  - "CDN"
related:
  - networking/proxies-load-balancers-and-cdns
  - networking/http-caching
sources:
  - type: primary-source
    title: "RFC 7336: Framework for Content Distribution Network Interconnection"
    url: "https://www.rfc-editor.org/rfc/rfc7336.html"
lastReviewed: "2026-09-08"
---

# Content delivery network

A content delivery network, or CDN, serves content through distributed edge locations rather than sending every request directly to one origin.

CDNs can reduce latency and origin load, but cache freshness, invalidation, routing, and origin fallback remain part of the system design.
