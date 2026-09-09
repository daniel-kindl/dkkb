---
title: Design tokens and semantic tokens
description: Store reusable design decisions as named tokens and use semantic layers so components depend on roles instead of raw visual values.
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
  - product-design/spacing-layout-and-responsive-design
sources:
  - type: primary-source
    title: "Design Tokens Format Module"
    note: The W3C Design Tokens Community Group defines an interoperable format for token names, values, types, groups, and references.
lastReviewed: "2026-09-09"
---

# Design tokens and semantic tokens

A design token gives a reusable design decision a stable name that can be consumed by tools and implementations. Tokens can represent color, spacing, typography, borders, motion, and other repeatable values.

## Separate raw values from roles

A primitive token can represent a raw value such as a color or spacing step. A semantic token represents its purpose, such as text-default, surface-warning, or space-component-gap.

Components should normally depend on semantic roles when the meaning must survive theming or product variation.

For example, a destructive control should request a destructive role rather than a specific red value. A theme can change the concrete value while preserving the contract.

## Use references to preserve intent

Token references let several semantic roles share a primitive value without losing their separate names. They can later diverge without changing component APIs.

Avoid very deep alias chains. Indirection that no longer communicates intent makes debugging and governance harder.

## Do not encode every number

A token system is not improved by replacing every literal with a global name. Create tokens for decisions that need reuse, consistency, theming, or governance.

Component-local values can remain local when they have no stable system meaning.

## Version token meaning

Changing a token value can alter many products without changing application code. Review semantic changes as carefully as component changes and test affected themes and states.

Renaming or changing the meaning of a public token is a migration concern, not a cosmetic cleanup.

## Limits

Tokens can distribute consistency, but they cannot decide whether the underlying design choice is correct. Visual and usability evaluation remain necessary.

## Sources

- W3C Design Tokens Community Group. *Design Tokens Format Module*.
