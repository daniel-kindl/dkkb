---
title: "Server-side request forgery"
description: "A vulnerability where attacker-controlled input causes a server to make unintended requests to internal or external resources."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - security
  - glossary
aliases:
  - "SSRF"
related:
  - security/server-side-request-forgery
sources:
  - type: primary-source
    title: "OWASP Server-Side Request Forgery Prevention Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html"
lastReviewed: "2026-09-08"
---

# Server-side request forgery

Server-side request forgery, or SSRF, lets attacker-controlled input influence a server-side outbound request.

The risk is greater when the server can reach internal services, metadata endpoints, or networks that the attacker cannot access directly.
