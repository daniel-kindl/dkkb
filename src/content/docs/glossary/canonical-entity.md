---
title: "Canonical entity"
description: "A domain-owned representation that gives one logical entity a stable identity independent of provider-specific records."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "canonical domain entity"
topics:
  - architecture
  - domain-modeling
related:
  - patterns/canonical-domain-entities-vs-provider-representations
sources:
  - type: literature
    title: "Domain-Driven Design: Tackling Complexity in the Heart of Software"
lastReviewed: "2026-09-08"
---

# Canonical entity

A canonical entity is the domain-owned representation of one logical thing when several external sources or representations refer to it.

It provides a stable identity and vocabulary inside the system while provider-specific fields remain at integration boundaries.

Canonical does not mean globally perfect. It means authoritative for the system's own domain model.
