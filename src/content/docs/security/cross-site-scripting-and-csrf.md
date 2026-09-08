---
title: Cross-site scripting and cross-site request forgery
description: Distinguish injected browser execution from forged authenticated requests and apply controls at the correct browser boundary.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - security
  - xss
  - csrf
related:
  - security/input-validation-output-encoding-and-injection
  - security/authentication-vs-authorization
  - security/defense-in-depth
sources:
  - type: primary-source
    title: "OWASP Cross Site Scripting Prevention Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
  - type: primary-source
    title: "OWASP Cross-Site Request Forgery Prevention Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
lastReviewed: "2026-09-08"
---

# Cross-site scripting and cross-site request forgery

[Cross-site scripting](../glossary/cross-site-scripting.md) and [cross-site request forgery](../glossary/cross-site-request-forgery.md) both involve browser trust boundaries, but they are different attack classes.

XSS causes attacker-controlled content to execute in a trusted page context.

CSRF causes a browser to send an unwanted state-changing request using credentials the browser attaches automatically.

## Cross-site scripting

XSS becomes possible when untrusted data reaches an executable browser context without the correct structural protection.

The main defenses are:

- framework escaping and safe templating defaults;
- context-specific output encoding;
- avoiding unsafe DOM APIs and raw HTML injection;
- sanitizing rich HTML only with maintained purpose-built libraries when rich HTML is required;
- Content Security Policy as additional containment, not as a replacement for correct output handling.

Stored and reflected XSS differ in how the malicious input reaches the page. The core invariant is the same: untrusted data must not become executable code in the trusted origin.

## Cross-site request forgery

CSRF exploits ambient authentication such as cookies that a browser sends with a request even when another site caused the request.

A state-changing endpoint must distinguish an intentional request from a cross-site forged request.

Common defenses include:

- SameSite cookie policy where compatible with the product flow;
- unpredictable CSRF tokens bound to the user session or request context;
- origin or referer validation as a supporting check;
- avoiding state changes through safe HTTP methods such as GET;
- requiring explicit authorization headers for APIs whose credentials are not attached automatically by the browser.

## XSS can defeat CSRF controls

If an attacker can execute script in the trusted origin through XSS, the script may be able to read or use the same CSRF tokens and application APIs as legitimate page code.

This is why XSS prevention remains a stronger boundary than adding CSRF tokens alone.

## Authentication is not intent

A request can be authenticated and still be forged.

Authentication answers who the request is associated with. CSRF protection provides evidence that the browser action came through an allowed interaction path.

## Practical guidance

Protect browser rendering against XSS with safe output handling and safe DOM APIs.

Protect cookie-authenticated state changes against CSRF with browser-aware request validation.

Do not treat the two terms as synonyms or assume that one control automatically prevents the other attack class.
