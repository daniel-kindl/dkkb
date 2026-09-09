---
title: Semantic color and theming
description: Assign color through semantic roles so state and hierarchy remain consistent across themes without making color the only carrier of meaning.
type: principle
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - ui
  - accessibility
related:
  - product-design/affordances-and-signifiers
sources:
  - type: primary-source
    title: "Web Content Accessibility Guidelines (WCAG) 2.2"
    note: Provides requirements for contrast and for information that must not depend on color alone.
lastReviewed: "2026-09-09"
---

# Semantic color and theming

A semantic color system assigns roles such as text, surface, border, accent, warning, error, and success instead of tying product meaning directly to raw color values.

## Separate role from value

Components should request the role they need. A theme maps that role to a concrete value that works with its surrounding surface.

This separation makes light, dark, high-contrast, and brand variants easier to reason about because the component contract stays stable while values change.

## Do not communicate by color alone

Status and interaction state need another perceivable cue when the distinction matters. Text, iconography, shape, position, or other treatment can supplement color.

Contrast requirements apply to each theme. A dark theme is not automatically accessible because it uses dark surfaces, and a light theme is not automatically readable because it uses white backgrounds.

## Use state roles consistently

Reserve warning, destructive, success, and selected treatments for stable meanings. Reusing the same color role for unrelated semantics weakens recognition and can create false expectations.

## Theme the whole state model

Check default, hover, focus, pressed, selected, disabled, error, and overlay states in each theme. A theme is incomplete if only static text and backgrounds have mappings.

## Limits

Semantic tokens do not remove the need for visual review. Context changes perceived contrast, simultaneous colors can interact, and user-agent or operating-system modes can override presentation.

## Sources

- W3C. *Web Content Accessibility Guidelines (WCAG) 2.2*. 2023.
