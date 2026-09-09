---
title: When to build a design system
description: Formalize a design system when repeated product work creates enough coordination value to justify the ownership and migration cost.
type: decision
status: reviewed
confidence: high
provenance:
  - derived-guidance
topics:
  - product-design
  - design-systems
related:
  - product-design/design-systems-and-boundaries
  - product-design/component-architecture-and-interaction-contracts
lastReviewed: "2026-09-09"
---

# When to build a design system

A formal design system is infrastructure for repeated product design and implementation. A small product does not need one merely because design systems are common in larger organizations.

## Build more system when coordination cost appears

A formal system becomes more valuable when:

- several products repeat the same interaction problems;
- teams repeatedly implement equivalent components;
- visual and behavioral drift creates user or maintenance cost;
- accessibility fixes need to propagate reliably;
- theming or multi-brand support needs shared semantic roles;
- product teams need a stable shared UI contract.

## Start with the smallest useful layer

A single product can begin with local styles, a few semantic tokens, and reusable components. Governance can remain lightweight while one team owns the whole surface.

Formalize only the decisions that have evidence of reuse. A premature general-purpose component can be harder to change than two clear local implementations.

## Account for maintenance cost

A design system needs documentation, review, testing, releases, deprecation, support, and migration. Those costs continue after the initial component library is shipped.

If no team owns that work, a formal system can become a stale dependency that slows product development.

## Do not optimize for adoption percentage

The goal is consistent, accessible, maintainable product behavior where shared solutions fit. Local solutions remain appropriate for product-specific workflows.

## Revisit the decision

The right level of formalization changes as products and teams grow. A small local library can evolve into a governed system after repeated needs become clear.
