---
title: "Connection reuse"
description: "The practice of sending multiple operations over an existing connection instead of opening a new connection for each operation."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - networking
  - glossary
related:
  - networking/connection-reuse-and-pooling
sources:
  - type: primary-source
    title: "RFC 9112: HTTP/1.1"
    url: "https://www.rfc-editor.org/rfc/rfc9112.html"
lastReviewed: "2026-09-08"
---

# Connection reuse

Connection reuse avoids repeating transport and security setup when one connection can safely carry more than one operation.

Reuse improves efficiency but requires lifecycle rules for idle, failed, stale, or overloaded connections.
