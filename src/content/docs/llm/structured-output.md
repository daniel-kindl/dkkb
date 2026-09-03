---
title: Structured LLM output
description: Constrain model output to a machine-checkable schema when downstream software depends on its structure.
type: practice
status: draft
confidence: high
provenance:
  - derived-guidance
topics: [llm, contracts, validation]
related: []
sources: []
lastReviewed: "2026-09-03"
---

# Structured LLM output

Use a machine-checkable schema when model output feeds software rather than a human reader.

## Why it helps

A schema makes the expected fields, types, and allowed values explicit. It reduces parsing ambiguity and lets the application reject malformed results before they affect state.

## Limits

Valid structure does not prove valid meaning. A model can produce a schema-valid value that is unsupported, inconsistent, or wrong.

## Practical guidance

Validate output at the application boundary. Keep schemas as small as the task permits. Distinguish required fields from optional fields and use enumerations when the domain is closed.

After structural validation, apply domain validation for identifiers, ranges, permissions, invariants, and references to external facts.

Do not use free-form text parsing when the downstream contract is already structured.
