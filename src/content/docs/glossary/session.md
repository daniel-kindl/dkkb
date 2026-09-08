---
title: "Session"
description: "A server- or client-tracked security context that associates a sequence of requests with an authenticated or otherwise stateful interaction."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - security
  - glossary
aliases:
  - "user session"
related:
  - security/session-management
  - security/authentication-vs-authorization
sources:
  - type: primary-source
    title: "OWASP Session Management Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html"
lastReviewed: "2026-09-08"
---

# Session

A session associates multiple requests with one stateful interaction, often including an authenticated user context.

Session identifiers act as credentials when possession grants access, so their generation, transport, expiry, rotation, and revocation are security-sensitive.
