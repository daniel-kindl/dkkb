---
title: "API contract"
description: "The set of observable operations, data shapes, errors, and guarantees that an API promises to its clients."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - api-design
  - contracts
related:
  - api-design/api-contracts-and-compatibility
sources:
  - type: primary-source
    title: "RFC 9110: HTTP Semantics"
    url: "https://www.rfc-editor.org/rfc/rfc9110"
  - type: primary-source
    title: "OpenAPI Specification"
    url: "https://spec.openapis.org/oas/latest.html"
lastReviewed: "2026-09-08"
---

# API contract

An API contract is the observable promise an API makes to its clients about how to call it and what behavior to expect.

The contract includes operation semantics, accepted inputs, returned data, errors, ordering or consistency guarantees, and relevant limits.

Implementation details are not automatically part of the intended contract, but observable behavior can still become a dependency in practice.
