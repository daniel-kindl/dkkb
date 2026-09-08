---
title: "Application programming interface"
description: "A defined interface through which one software component can request operations or exchange data with another."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
aliases:
  - "API"
topics:
  - api-design
  - architecture
related:
  - api-design/api-contracts-and-compatibility
  - api-design/resource-and-operation-design
sources:
  - type: primary-source
    title: "OpenAPI Specification"
    url: "https://spec.openapis.org/oas/latest.html"
lastReviewed: "2026-09-08"
---

# Application programming interface

An application programming interface, or API, is a defined interface through which software components interact using documented operations, inputs, outputs, and rules.

An API creates a boundary between an implementation and its callers. The useful engineering concern is the contract that callers can depend on.

APIs can be local library interfaces, network services, operating-system interfaces, or other software boundaries.
