---
title: "Transport Layer Security"
description: "A protocol that protects network communication with authenticated encryption and peer authentication mechanisms."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - networking
  - glossary
aliases:
  - "TLS"
related:
  - networking/tls-and-transport-security
sources:
  - type: primary-source
    title: "RFC 8446: The Transport Layer Security Protocol Version 1.3"
    url: "https://www.rfc-editor.org/rfc/rfc8446.html"
lastReviewed: "2026-09-08"
---

# Transport Layer Security

Transport Layer Security, or TLS, protects data in transit using authenticated encryption and negotiated cryptographic parameters.

TLS can authenticate the server and optionally the client, but it does not decide whether an authenticated application identity is authorized to perform an operation.
