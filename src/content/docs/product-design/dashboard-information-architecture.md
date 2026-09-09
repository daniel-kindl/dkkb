---
title: Dashboard information architecture
description: Organize dashboards around decisions, exceptions, trends, and drill-down paths instead of treating every available metric as equally important.
type: principle
status: reviewed
confidence: medium
provenance:
  - literature
  - derived-guidance
topics:
  - product-design
  - information-architecture
  - ui
related:
  - product-design/cognitive-load
  - product-design/progressive-disclosure
sources:
  - type: literature
    title: "Information Dashboard Design"
    note: Stephen Few discusses dashboard information selection, comparison, context, and visual prioritization.
lastReviewed: "2026-09-09"
---

# Dashboard information architecture

A dashboard should support a defined monitoring or decision task. It is not a neutral container for every metric a system can produce.

## Start with decisions and exceptions

Identify what users need to notice, compare, diagnose, or act on. Give those signals stronger placement than background context.

A metric without a comparison, threshold, trend, target, or decision context can be difficult to interpret even when its numeric value is accurate.

## Organize by relationship

Group information that users need to compare. Keep units, time ranges, filters, and data freshness visible when they affect interpretation.

Use progressive detail for diagnostics. The summary should point to a deeper view rather than duplicate all underlying data on one screen.

## Preserve scope

Global filters, time ranges, environment selectors, and entity scope must remain clear. A dashboard can produce a technically correct but misleading view if users misread which data is included.

## Handle abnormal states

Missing data, partial data, stale data, loading, and collection failure are information states. Distinguish them from a legitimate zero value.

## Limits

Dashboards are poor substitutes for alerting when immediate action is required and poor substitutes for exploratory analysis when users need flexible questions. Choose the surface from the task rather than from a preference for dashboards.

## Sources

- Stephen Few. *Information Dashboard Design*. 2nd ed. Analytics Press, 2013.
