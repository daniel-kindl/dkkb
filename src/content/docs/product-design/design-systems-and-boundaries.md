---
title: Design systems and their boundaries
description: Treat a design system as shared principles, tokens, patterns, components, documentation, and governance rather than as a component package alone.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - design-systems
related:
  - product-design/semantic-color-and-theming
  - product-design/component-interaction-states
sources:
  - type: primary-source
    title: "GOV.UK Design System"
    note: Demonstrates a maintained system that combines styles, components, patterns, guidance, accessibility, contribution, and governance.
lastReviewed: "2026-09-09"
---

# Design systems and their boundaries

A design system is a maintained set of shared design decisions and reusable assets that helps multiple product surfaces behave and communicate consistently.

A component library is reusable implementation. A token system stores reusable design values and semantic roles. A pattern library documents repeatable solutions to recurring interaction problems. These can be parts of a design system, but none is the whole system by itself.

## A system needs more than assets

A useful design system usually includes:

- principles and usage guidance;
- design tokens and semantic roles;
- interaction and content patterns;
- reusable components;
- accessibility requirements;
- documentation and examples;
- contribution and review rules;
- ownership and release practices.

Without governance, the collection can drift into unrelated components with similar styling.

## Keep design reasoning separate from implementation

The system should define durable behavior and semantics before framework-specific APIs. A button contract can define role, states, keyboard behavior, destructive meaning, and variants without requiring one frontend framework.

Implementation packages can then realize that contract for supported platforms.

## Reuse patterns without forcing components

A reusable pattern describes a problem and interaction structure. A reusable component packages a concrete implementation. Some patterns span several components or need different implementations across contexts.

Do not create a component only because two screens look similar. Reuse should follow stable semantics and behavior.

## Limits

A design system creates maintenance work. It is most valuable when repeated product work benefits from shared decisions and the organization can maintain the system as a product.

## Sources

- UK Government Digital Service. *GOV.UK Design System*.
