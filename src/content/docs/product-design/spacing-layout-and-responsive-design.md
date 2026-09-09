---
title: Spacing, layout, and responsive design
description: Use consistent spatial relationships and adaptable layout rules to preserve meaning, priority, and task completion across available space.
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
  - product-design/progressive-disclosure
sources:
  - type: primary-source
    title: "Web Content Accessibility Guidelines (WCAG) 2.2"
    note: Reflow and orientation requirements constrain responsive presentation without loss of information or functionality.
lastReviewed: "2026-09-09"
---

# Spacing, layout, and responsive design

Spacing and alignment communicate relationships. Layout defines how those relationships use available space. Responsive design adapts the presentation while preserving the task and information model.

## Use a spacing system

A small set of reusable spacing relationships improves consistency and makes grouping easier to perceive. The exact scale is less important than predictable use.

Use tighter spacing within a group and stronger separation between distinct groups. Do not add containers or dividers when spacing already communicates the relationship clearly.

## Use grids as constraints, not goals

Columns, baselines, and alignment rules can make repeated content easier to scan. Break a grid when the content or task requires a different relationship rather than forcing all content into identical geometry.

## Respond to available space

Responsive layout can reflow columns, change navigation presentation, move secondary controls, or alter information density. Preserve the meaning and availability of important functions.

Do not treat mobile as a reduced product by default. If functionality is removed, the product decision should be explicit rather than an accidental consequence of viewport width.

## Accessibility constraints

Layouts must remain usable with text resize, zoom, reflow, focus indicators, and different input methods. Avoid fixed dimensions that cause essential information or controls to overlap or disappear.

## Limits

Breakpoint counts and grid dimensions are implementation choices. Product-design guidance should define the relationship and behavior that must survive adaptation, not prescribe arbitrary pixel values.

## Sources

- W3C. *Web Content Accessibility Guidelines (WCAG) 2.2*. 2023.
