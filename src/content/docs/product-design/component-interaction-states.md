---
title: Component interaction states
description: Define component behavior across default, focus, hover, pressed, selected, disabled, busy, validation, and completion states as part of one interaction contract.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - ui
  - interaction-design
  - accessibility
related:
  - product-design/feedback-and-system-status
  - product-design/affordances-and-signifiers
sources:
  - type: primary-source
    title: "WAI-ARIA Authoring Practices Guide"
    note: Documents interaction patterns, keyboard behavior, roles, states, and properties for common widgets.
lastReviewed: "2026-09-09"
---

# Component interaction states

An interactive component is a state machine, not a static shape. Its visual and behavioral contract should cover the states that users can enter through pointer, touch, keyboard, assistive technology, validation, and asynchronous work.

## Define states by meaning

Common states include default, hover, focus, pressed, selected, disabled, busy, invalid, and completed. Not every component needs every state.

Do not use the same visual treatment for states with different meanings. Disabled, read-only, unavailable, and loading are different conditions and can require different behavior.

## Make focus a first-class state

Keyboard users need a visible indication of the current focus location. Focus order should follow the task and document structure rather than the visual position produced by styling alone.

Do not remove focus indication because pointer users do not need it. Focus behavior is part of the interaction contract.

## Keep keyboard and pointer meaning aligned

Equivalent actions should produce equivalent results across supported input methods. A hover-only control or tooltip cannot be the sole path to required information.

## Represent asynchronous state

When an action starts remote work, define whether the component becomes busy, can be activated again, supports cancellation, or updates optimistically. Prevent duplicate actions only when repeated activation is unsafe or meaningless.

## Limits

ARIA roles and states describe semantics but do not create correct behavior automatically. Use native controls where they meet the interaction need, and test custom widgets with keyboard and assistive technologies.

## Sources

- W3C Web Accessibility Initiative. *WAI-ARIA Authoring Practices Guide*.
