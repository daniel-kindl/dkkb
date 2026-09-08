---
title: "Secret"
description: "Sensitive credential material whose disclosure can grant authority or reveal protected data, such as API keys, tokens, or private keys."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - security
  - glossary
aliases:
  - "application secret"
related:
  - security/secrets-and-encryption-boundaries
sources:
  - type: primary-source
    title: "OWASP Secrets Management Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
lastReviewed: "2026-09-08"
---

# Secret

A secret is sensitive credential material whose disclosure can grant access or undermine a security boundary.

Secrets should have explicit ownership, limited distribution, protected storage, rotation, and removal rather than being embedded in source code or logs.
