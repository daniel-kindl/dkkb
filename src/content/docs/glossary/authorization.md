---
title: "Authorization"
description: "The decision process that determines whether a principal is permitted to perform an action on a resource."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - security
  - glossary
aliases:
  - "AuthZ"
related:
  - security/authentication-vs-authorization
  - security/least-privilege
sources:
  - type: primary-source
    title: "OWASP Authorization Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
lastReviewed: "2026-09-08"
---

# Authorization

Authorization decides whether a principal may perform a requested action on a resource under the current policy.

It follows or otherwise uses identity/context information but must not be confused with authentication, which establishes who the principal is.
