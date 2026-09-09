---
title: Overlays, navigation, and disclosure controls
description: Choose dialogs, popovers, menus, tabs, and disclosure controls according to interaction scope, persistence, focus needs, and information structure.
type: decision
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - ui
  - interaction-design
related:
  - product-design/progressive-disclosure
  - product-design/cognitive-load
sources:
  - type: primary-source
    title: "WAI-ARIA Authoring Practices Guide"
    note: Defines distinct semantics and interaction patterns for dialogs, menus, tabs, and disclosures.
lastReviewed: "2026-09-09"
---

# Overlays, navigation, and disclosure controls

Dialogs, popovers, menus, tabs, and disclosure controls solve different interaction problems. Their visible shape can be similar, but their semantics and focus behavior are not interchangeable.

## Dialogs

Use a dialog when a temporary task or decision needs to interrupt or isolate the current context. Modal behavior is justified when interaction with the background would be invalid or confusing.

Avoid modal dialogs for information that users need to compare with the underlying page. Repeated nested dialogs create focus, orientation, and recovery problems.

## Popovers and menus

A popover can expose contextual information or controls without changing page structure. A menu represents a set of actions or choices and has specific keyboard expectations.

Do not turn every collection of links into an application-style menu. Native navigation patterns are often simpler and more familiar.

## Tabs

Tabs switch between peer views within one context. They work best when the set is small, labels are concise, and users benefit from switching without leaving the surrounding task.

Do not use tabs to hide sequential steps that must be completed in order.

## Disclosure controls

A disclosure expands or collapses subordinate content. It is useful for optional detail, but repeated hiding can make essential information hard to discover.

## Decision factors

Choose the pattern from information relationship, persistence, navigation history, focus ownership, available space, and expected keyboard behavior. The component name should follow semantics rather than visual resemblance.

## Sources

- W3C Web Accessibility Initiative. *WAI-ARIA Authoring Practices Guide*.
