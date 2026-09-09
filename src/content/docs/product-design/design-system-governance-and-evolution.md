---
title: Design-system governance and evolution
description: Maintain design-system quality through explicit ownership, documentation, contribution review, versioning, deprecation, and migration support.
type: practice
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - design-systems
  - governance
related:
  - product-design/component-interaction-states
sources:
  - type: primary-source
    title: "Semantic Versioning 2.0.0"
    note: Defines a versioning model for public interfaces and backward-incompatible changes.
  - type: primary-source
    title: "GOV.UK Design System contribution criteria"
    note: Provides an example of documented contribution and review governance for shared patterns and components.
lastReviewed: "2026-09-09"
---

# Design-system governance and evolution

A design system is a shared dependency. Changes can affect many products at once, so ownership and migration are part of the design problem.

## Assign ownership

Define who can approve new tokens, patterns, components, accessibility contracts, and breaking changes. Contribution should be possible without making every local preference a system standard.

A proposed addition should solve a repeated problem, have a stable semantic model, and be maintainable by the system owners.

## Document decisions and contracts

Documentation should cover purpose, suitable contexts, states, content requirements, accessibility, examples, known limits, and migration notes where relevant.

Examples are supporting evidence. They should not be the only specification of behavior.

## Version public contracts

A change can be breaking when it removes a token, renames a public variant, changes required markup, changes focus behavior, alters component semantics, or changes a state contract in a way consumers must handle.

Use the repository's chosen versioning policy consistently. Semantic Versioning can communicate compatibility when the system exposes a versioned public API.

## Deprecate before removal when practical

Mark the replacement, explain why the old contract is being removed, and give consumers enough information to migrate. Automated migrations can help with mechanical changes but cannot validate changed product semantics.

## Measure adoption carefully

Adoption is not a goal by itself. A product should use the system where the shared contract fits. Track divergence when it causes duplicated work, inconsistency, or accessibility risk rather than treating every local component as a failure.

## Limits

Strict central review can become a bottleneck. Very loose contribution can fragment the system. Governance should match the number of consumers, risk, and maintenance capacity.

## Sources

- Tom Preston-Werner. *Semantic Versioning 2.0.0*.
- UK Government Digital Service. *GOV.UK Design System contribution criteria*.
