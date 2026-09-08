---
title: Name for intent and domain meaning
description: Choose names that expose the purpose, boundary, and domain meaning of code.
type: practice
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - coding
  - maintainability
  - readability
related:
  - principles/dry
  - principles/separation-of-concerns
  - testing/deterministic-tests
sources:
  - type: literature
    title: "Refactoring: Improving the Design of Existing Code"
    note: Martin Fowler presents meaningful names as a primary way to make code easier to understand and change.
lastReviewed: "2026-09-08"
---

# Name for intent and domain meaning

Choose names that tell the reader what a value, operation, or boundary means in the domain.

A name is part of the code's interface. It reduces the context a reader must reconstruct from implementation details.

## Context

Names become important when code crosses a boundary:

- a value passes between modules;
- a function expresses a business operation;
- an API exposes a request or response;
- a test describes an expected behavior;
- a variable carries a unit, state, or lifecycle meaning.

A short name can be clear in a small local scope. A wider boundary needs a name that carries more context.

## Make intent visible

Prefer names that explain why the code exists or what contract it represents.

```ts title="offers.ts"
function selectBestOffer(offers: Offer[], region: Region): Offer | undefined
{
    return offers
        .filter((offer) => offer.region === region)
        .sort(compareByTotalPrice)[0];
}
```

The name `selectBestOffer` communicates an operation. A name such as `process` or `handle` would force the reader to inspect the body before learning the purpose.

Names should also expose important units and states:

- `timeoutMs` is clearer than `timeout` when several time units exist;
- `publishedAt` is clearer than `date` when the lifecycle event matters;
- `normalizedTitle` is clearer than `title2` when the value has a transformation contract.

A name must not claim more than the implementation guarantees. Calling a value `validatedRequest` before validation creates a false contract.

## Name at the right boundary

Local names can rely on nearby context. Public names cannot rely on the reader opening the implementation.

Use domain terms consistently across function names, data fields, API contracts, and tests. If two names refer to the same concept, changing the term only to avoid repetition makes the system harder to search and discuss.

Do not hide a different concept behind one convenient name. A `price` that can mean either the current price or the historical observed price creates ambiguity at every call site. Give the concepts separate names or define one explicit contract.

:::tip[Name the decision, not the mechanics]
A name such as `loadVisibleOffers` communicates a policy. A name such as `queryRows` exposes only one implementation step.
:::

## Trade-offs

Long names can make code harder to scan. A name should carry the context that the reader needs at that boundary, not every detail known by the implementation.

Common words such as `id` or `value` can be correct in a narrow scope. They become weak when several identifiers or values are visible at the same time.

Renaming a public field or API operation can break consumers. Treat names at external boundaries as compatibility decisions and use an explicit migration when the contract must change.

## Failure modes

Poor naming produces:

- comments that repeat what the code should say;
- boolean flags whose meaning changes at different call sites;
- generic operations such as `run`, `doThing`, or `process`;
- names that describe an old implementation after the implementation changes;
- inconsistent terms for one domain concept.

A precise name cannot repair a function with several unrelated responsibilities. Combine naming with [separation of concerns](/dkkb/principles/separation-of-concerns/) and [cohesive functions and modules](/dkkb/coding/keep-functions-and-modules-cohesive/).

## Interaction with testing and review

Names improve tests when test names describe behavior rather than implementation steps. They also help reviewers compare a change with the domain language used in requirements and API contracts.

A rename can be a safe behavior-preserving refactoring when the boundary contract remains unchanged. Keep a rename separate from a behavioral change when that separation makes review and rollback easier.

## Practical guidance

Before accepting a name, ask:

1. Does it identify the domain concept or only the current implementation?
2. Does it reveal important units, state, or ownership?
3. Would a reader understand the operation without opening its body?
4. Is the same term used for the same concept elsewhere?
5. Does the name remain true when the implementation changes?

Use the smallest name that answers the questions relevant to its boundary.
