---
title: "Idempotency"
description: "The property that repeating the same operation has the same intended effect as performing it once."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - reliability
  - api-design
related:
  - reliability/idempotency
sources:
  - type: primary-source
    title: "RFC 9110: HTTP Semantics"
    url: "https://www.rfc-editor.org/rfc/rfc9110"
lastReviewed: "2026-09-08"
---

# Idempotency

Idempotency means that repeating an operation produces the same intended effect as performing that operation once.

The property is valuable when callers may retry after timeouts or uncertain failures. It prevents repeated execution from multiplying a side effect.

An idempotent operation can still return different metadata on repeated calls. The important property is the intended effect on system state.
