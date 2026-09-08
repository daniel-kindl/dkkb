---
title: "Output encoding"
description: "The context-specific transformation that represents untrusted data safely so a target interpreter treats it as data rather than syntax."
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
  - security/cross-site-scripting-and-csrf
sources:
  - type: primary-source
    title: "OWASP Cross Site Scripting Prevention Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
lastReviewed: "2026-09-08"
---

# Output encoding

Output encoding represents data using the escaping rules of the destination context so the interpreter does not treat it as executable syntax.

Encoding is context-specific: HTML text, HTML attributes, URLs, CSS, JavaScript, and other interpreters require different handling.
