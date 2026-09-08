---
title: "Input validation"
description: "The process of checking external input against the syntactic and semantic constraints accepted by a system boundary."
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
    title: "OWASP Input Validation Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
lastReviewed: "2026-09-08"
---

# Input validation

Input validation checks that data entering a trust boundary has an allowed form, range, type, and meaning.

Validation reduces malformed or unexpected inputs but does not replace safe output handling or parameterized interpreter interfaces.
