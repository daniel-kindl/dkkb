---
title: "Injection"
description: "A vulnerability class where untrusted data is interpreted as commands or syntax by an interpreter instead of remaining data."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - security
  - glossary
related:
  - security/input-validation-output-encoding-and-injection
sources:
  - type: primary-source
    title: "OWASP Injection Prevention Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html"
lastReviewed: "2026-09-08"
---

# Injection

Injection occurs when untrusted input changes the structure or commands interpreted by a downstream parser or execution engine.

Parameterized APIs, safe structured interfaces, validation, and context-specific encoding keep data separate from executable syntax.
