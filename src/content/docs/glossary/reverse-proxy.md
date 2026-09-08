---
title: "Reverse proxy"
description: "An intermediary that receives client requests for an origin service and forwards them to upstream servers."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - networking
  - glossary
related:
  - networking/proxies-load-balancers-and-cdns
sources:
  - type: primary-source
    title: "RFC 9110: HTTP Semantics"
    url: "https://www.rfc-editor.org/rfc/rfc9110.html"
lastReviewed: "2026-09-08"
---

# Reverse proxy

A reverse proxy accepts requests on behalf of one or more origin services and forwards those requests to upstream servers.

It can centralize routing, TLS termination, caching, authentication support, or policy, but it also becomes part of the request path and failure model.
