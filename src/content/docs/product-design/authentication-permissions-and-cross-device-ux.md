---
title: Authentication, permissions, and cross-device UX
description: Request identity, permissions, and device-specific capabilities only when needed, while preserving understandable task state across constrained contexts.
type: practice
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - ux
  - accessibility
related:
  - product-design/user-centered-design
  - product-design/cognitive-load
sources:
  - type: primary-source
    title: "Web Content Accessibility Guidelines (WCAG) 2.2"
    note: Includes requirements relevant to reflow, input, focus, redundant entry, and accessible authentication.
lastReviewed: "2026-09-09"
---

# Authentication, permissions, and cross-device UX

Authentication and permission requests interrupt the user's primary task. Request them when the capability or protected action becomes relevant, unless earlier identity is necessary for security or continuity.

## Preserve the user's intent

If a user must sign in during a task, return them to the intended action after authentication when safe. Do not discard entered data or navigation context only because identity was required midway.

Explain why a permission is needed before the platform prompt when the reason is not obvious. Request the smallest capability that supports the task and provide a useful path when permission is denied.

## Do not create unnecessary cognitive tests

Authentication should support password managers, paste, passkeys, and other mechanisms that reduce memory work where the platform permits them. Accessibility requirements can prohibit authentication steps that depend only on cognitive-function tests.

## Design across devices by capability and context

Responsive UX is more than fitting the same layout into a smaller viewport. Input method, screen size, orientation, connection quality, interruption patterns, and available device capabilities can change the task.

Preserve the meaning and completion path across supported layouts. Do not remove necessary functionality from a narrow viewport only to simplify presentation.

When users can move between devices, preserve durable task state where the product model supports it. Avoid requiring users to repeat completed work without a security or data-integrity reason.

## Limits

Security can require reauthentication, explicit consent, or restricted session transfer. Explain the requirement in user terms and preserve non-sensitive work where feasible.

## Sources

- W3C. *Web Content Accessibility Guidelines (WCAG) 2.2*. 2023.
