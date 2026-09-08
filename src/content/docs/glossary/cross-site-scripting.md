---
title: "Cross-site scripting"
description: "A vulnerability class where attacker-controlled content executes as script or active content in a trusted web origin."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - security
  - glossary
aliases:
  - "XSS"
related:
  - security/cross-site-scripting-and-csrf
  - security/input-validation-output-encoding-and-injection
sources:
  - type: primary-source
    title: "OWASP Cross Site Scripting Prevention Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
lastReviewed: "2026-09-08"
---

# Cross-site scripting

Cross-site scripting, or XSS, occurs when attacker-controlled data becomes executable content in a trusted browser origin.

The primary defenses are safe templating, context-appropriate output encoding, safe DOM APIs, and sanitization only where intentionally accepting rich HTML.
