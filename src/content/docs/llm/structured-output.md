---
title: Structured LLM output
description: Constrain model output to a machine-checkable schema when downstream software depends on its structure.
type: practice
status: draft
confidence: high
provenance:
  - derived-guidance
topics: [llm, contracts, validation]
related:
  - llm/evaluation-and-hallucination
sources: []
lastReviewed: "2026-09-03"
---

# Structured LLM output

Use a machine-checkable schema when model output feeds software rather than a human reader.

A small contract can make the downstream boundary explicit:

```json title="result-schema.json"
{
    "type": "object",
    "required": ["decision", "reason"],
    "properties": {
        "decision": {
            "enum": ["approve", "reject"]
        },
        "reason": {
            "type": "string"
        }
    }
}
```

## Why it helps

A schema makes the expected fields, types, and allowed values explicit. It reduces parsing ambiguity and lets the application reject malformed results before they affect state.

## Limits

Valid structure does not prove valid meaning. A model can produce a schema-valid value that is unsupported, inconsistent, or wrong.

:::caution[Schema-valid can still be wrong]
Structural validation answers whether the output has the expected shape. It does not verify the factual basis, permission, business invariant, or semantic correctness of the values.
:::

## Practical guidance

Validate output at the application boundary. Keep schemas as small as the task permits. Distinguish required fields from optional fields and use enumerations when the domain is closed.

After structural validation, apply domain validation for identifiers, ranges, permissions, invariants, and references to external facts.

Do not use free-form text parsing when the downstream contract is already structured.
