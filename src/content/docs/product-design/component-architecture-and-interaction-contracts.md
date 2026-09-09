---
title: Component architecture and interaction contracts
description: Separate primitives, composites, variants, and interaction contracts so reuse preserves semantics without creating unbounded component APIs.
type: principle
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - design-systems
  - interaction-design
related:
  - product-design/component-interaction-states
  - product-design/overlays-navigation-and-disclosure-controls
sources:
  - type: primary-source
    title: "WAI-ARIA Authoring Practices Guide"
    note: Defines interaction contracts for common widgets, including semantics, states, focus, and keyboard behavior.
lastReviewed: "2026-09-09"
---

# Component architecture and interaction contracts

A primitive provides a small reusable capability. A composite combines primitives into a larger semantic unit. The distinction should follow responsibility rather than a fixed component size.

## Define the contract before variants

A component contract should state:

- semantic purpose;
- required content;
- supported states;
- keyboard and focus behavior;
- validation and asynchronous behavior where relevant;
- responsive behavior;
- accessibility requirements;
- events or actions exposed to the product.

Visual variants should not silently change those semantics.

## Keep variants bounded

Variants are useful when several products need a stable, named difference such as size, emphasis, density, or destructive intent.

A component API with many boolean switches can create unsupported combinations and hide several different components behind one name. Split responsibilities when combinations no longer share one interaction contract.

## Prefer composition for product-specific structure

Composite components can provide a proven default while exposing controlled extension points. Do not make every internal element configurable only to satisfy hypothetical reuse.

A product can compose primitives directly when its workflow is materially different from the system composite.

## Treat states as API

Loading, disabled, invalid, selected, expanded, and busy behavior are part of the public component contract. A breaking state change can affect accessibility and workflows even if the visual API does not change.

## Limits

Component architecture is constrained by the target platform and framework. The design system should own semantic and interaction guarantees while implementation repositories own the concrete mechanism.

## Sources

- W3C Web Accessibility Initiative. *WAI-ARIA Authoring Practices Guide*.
