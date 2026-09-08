---
title: "Keep-alive"
description: "A connection behavior that keeps an established connection available for additional requests instead of closing it after one exchange."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - networking
  - glossary
aliases:
  - "persistent connection"
related:
  - networking/connection-reuse-and-pooling
sources:
  - type: primary-source
    title: "RFC 9112: HTTP/1.1"
    url: "https://www.rfc-editor.org/rfc/rfc9112.html"
lastReviewed: "2026-09-08"
---

# Keep-alive

Keep-alive keeps a connection open so later operations can reuse it instead of paying a new connection setup cost.

The term is commonly associated with persistent HTTP connections, while exact idle and lifetime behavior depends on the protocol and implementation.
