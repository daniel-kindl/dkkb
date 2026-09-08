---
title: "Cross-site request forgery"
description: "An attack where a browser is induced to send an unwanted authenticated request using credentials attached automatically by the browser."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - security
  - glossary
aliases:
  - "CSRF"
related:
  - security/cross-site-scripting-and-csrf
  - security/session-management
sources:
  - type: primary-source
    title: "OWASP Cross-Site Request Forgery Prevention Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
lastReviewed: "2026-09-08"
---

# Cross-site request forgery

Cross-site request forgery, or CSRF, causes a browser to send an unwanted state-changing request with ambient credentials such as cookies.

Defenses provide evidence of user intent or same-site origin, commonly with SameSite cookies, CSRF tokens, or origin validation.
