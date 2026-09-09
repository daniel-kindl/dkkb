---
title: Experience states and destructive actions
description: Treat empty, loading, error, success, and destructive-operation states as normal parts of a workflow with clear next actions and recovery.
type: principle
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - ux
  - interaction-design
related:
  - product-design/feedback-and-system-status
  - product-design/progressive-disclosure
sources:
  - type: primary-source
    title: "10 Usability Heuristics for User Interface Design"
    note: Covers system status, error prevention, user control, and recovery.
lastReviewed: "2026-09-09"
---

# Experience states and destructive actions

Empty, loading, error, and success states are part of the workflow. They should preserve orientation and tell users what can happen next.

## Empty states

Distinguish a genuinely empty collection from no search matches, missing permission, unavailable data, and a loading state. Explain why no content appears when the cause is not obvious.

Offer a next action only when it is relevant. Decorative empty-state copy should not obscure the actual condition.

## Loading states

Show that work is in progress when delay would otherwise create uncertainty. Preserve stable layout and prior useful content when possible.

Use progress indicators that match what the system knows. Do not show fake precision for an operation with unknown duration.

## Error states

State what failed, what was preserved, whether retrying is safe, and what recovery is available. Keep valid user input when practical.

Do not convert every backend error into the same generic message if different recovery actions are required.

## Success states

Completion feedback should be proportional to the action. A visible state change can be enough for a local toggle. A submitted application or background job can need a receipt, identifier, next step, or later status surface.

## Destructive actions

Prefer reversibility when feasible. Undo or restore can protect users without adding confirmation friction to every action.

Use confirmation when an action is high-impact, unusual, or irreversible and the prompt can explain a concrete consequence. Confirmation that repeats only "Are you sure?" provides little decision support.

## Limits

Optimistic interfaces can reduce perceived delay when rollback is safe, but they must represent rejection or conflict accurately. Never report a durable success that the system has not established.

## Sources

- Jakob Nielsen. *10 Usability Heuristics for User Interface Design*. Nielsen Norman Group.
