---
title: Keep functions and modules cohesive
description: Group behavior that belongs together and give each boundary a focused responsibility.
type: practice
status: reviewed
confidence: high
provenance:
  - primary-source
  - literature
  - derived-guidance
topics:
  - coding
  - cohesion
  - modularity
  - maintainability
related:
  - principles/separation-of-concerns
  - principles/dry
  - principles/composition-over-inheritance
  - testing/testing-strategy
sources:
  - type: primary-source
    title: "On the Criteria To Be Used in Decomposing Systems into Modules"
    note: David Parnas describes decomposing modules around design decisions that should be hidden from other modules.
  - type: literature
    title: "Clean Code: A Handbook of Agile Software Craftsmanship"
    note: Robert C. Martin discusses focused functions and the cost of functions that mix several levels of responsibility.
lastReviewed: "2026-09-08"
---

# Keep functions and modules cohesive

Keep behavior together when it belongs to one responsibility, and separate it when it changes for a different reason.

Cohesion is about how strongly the parts of a unit belong together. A cohesive function or module gives the reader one meaningful subject to understand.

## Context

A function is cohesive when its operations contribute to one result or one state transition. A module is cohesive when its public behavior protects one related concept or change boundary.

Cohesion does not mean that a function must contain one statement. A function can validate input, calculate a result, and construct an output when those steps form one coherent operation.

```ts title="offer-summary.ts"
function summarizeOffer(offer: Offer): OfferSummary
{
    const totalPrice = calculateTotalPrice(offer);
    const savings = calculateSavings(offer);

    return {
        currency: offer.currency,
        totalPrice,
        savings,
    };
}
```

The function has several steps, but they all create one offer summary. Extracting a step is useful only when it makes a boundary clearer or allows independent reuse and testing.

## Prefer meaningful boundaries

A useful boundary hides a decision, protects an invariant, or isolates a change driver.

Functions often make good boundaries for:

- one business operation;
- one validation or normalization contract;
- one state transition;
- one translation between representations.

Modules often make good boundaries for:

- one domain concept;
- one external integration;
- one persistence decision;
- one policy with several supporting operations.

A boundary that only forwards calls can add navigation cost without increasing cohesion. Use [separation of concerns](/dkkb/principles/separation-of-concerns/) to decide whether the split protects a real distinction.

## Trade-offs

Small functions can be easier to test and review. Excessive extraction can make a simple operation difficult to follow because the reader must jump through many names and files.

A module with one public operation can still be cohesive if it protects a meaningful contract. A module with many public operations can still be cohesive if they form one stable domain boundary.

Do not force unrelated concepts together because their code currently looks similar. The [DRY principle](/dkkb/principles/dry/) concerns duplicated knowledge, not every repeated shape.

:::caution[Size is a signal, not the rule]
A long function can indicate several responsibilities, but a short function can still mix unrelated policies. Judge the boundary by responsibility and change reason.
:::

## Failure modes

Low cohesion commonly appears as:

- a utility module that collects unrelated helpers;
- a function that validates, persists, sends notifications, and formats a response;
- a class with methods that use unrelated state;
- a shared abstraction that grows flags for several concepts;
- a long call chain created by splitting every line into a function.

These structures increase the context required for a change. They also make tests describe implementation fragments instead of meaningful behavior.

## Interaction with testing and architecture

A cohesive unit gives tests a clear subject and reduces setup that is unrelated to the behavior under test. A boundary can also make a meaningful contract test possible.

Cohesion is not a reason to create a separate service or process. Deployment boundaries add latency, failure modes, operational cost, and data-contract work. Keep a cohesive unit in the same module or application when a separate deployment boundary adds no useful independence.

The [composition over inheritance](/dkkb/principles/composition-over-inheritance/) principle can support cohesion by keeping behavior in focused collaborators rather than growing a hierarchy with mixed responsibilities.

## Practical guidance

When a function or module feels difficult to name, test, or review, ask:

1. What result or state transition does this unit own?
2. Which parts change for the same reason?
3. Which parts have different callers, policies, or failure modes?
4. Would a new boundary hide a decision or only move code?
5. Can a reviewer understand the unit without loading unrelated context?

Keep the boundary that makes the responsibility and change reason clearest.
