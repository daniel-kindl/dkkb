---
title: Refactor in behavior-preserving steps
description: Improve internal structure through small changes that keep observable behavior stable and reviewable.
type: practice
status: draft
confidence: high
provenance:
  - primary-source
  - literature
  - derived-guidance
topics:
  - coding
  - refactoring
  - maintainability
  - review
related:
  - principles/dry
  - principles/separation-of-concerns
  - testing/testing-strategy
  - testing/deterministic-tests
  - practices/conventional-commits
sources:
  - type: primary-source
    title: "Refactoring"
    url: "https://refactoring.com/"
    note: Martin Fowler's reference site defines refactoring as changing internal structure without changing observable behavior.
  - type: literature
    title: "Refactoring: Improving the Design of Existing Code"
    note: The book presents small, named transformations supported by tests and repeated feedback.
---

# Refactor in behavior-preserving steps

Refactoring changes the internal structure of code without intentionally changing its externally observable behavior.

The purpose is to make future changes safer and clearer. Refactoring is not a substitute for a feature, bug fix, or redesign that changes the contract.

## Establish the behavior boundary

Before changing structure, identify what must remain stable:

- returned values and errors;
- persisted state and emitted events;
- API and file formats;
- timing or ordering guarantees that callers depend on;
- security and authorization behavior;
- user-visible routes and content.

Tests are useful evidence for this boundary, but tests do not define every requirement automatically. Read the existing contract and add a focused test when the behavior is not protected.

## Use small transformations

A safe refactoring usually has one structural purpose:

1. create a focused test or confirm the relevant existing coverage;
2. make one small structural change;
3. run the relevant checks;
4. inspect the diff for unintended behavior;
5. repeat or stop when the boundary is clear.

Examples include extracting a function, renaming a concept, moving code behind a module boundary, replacing duplicated knowledge with one source, or simplifying a conditional without changing its result.

```ts title="price.ts"
function calculateSalePrice(price: Money, discount: Percentage): Money
{
    const discountAmount = price.multiply(discount.asFraction());

    return price.subtract(discountAmount);
}
```

A later change can extract `calculateDiscountAmount` if that creates a useful contract. Extracting every expression before the behavior is understood creates movement without clarity.

## Keep change types separate when useful

A refactoring can be part of a feature or fix, but separating structural and behavioral changes often improves review.

A reviewer can then ask two different questions:

- Did the internal structure improve without changing behavior?
- Does the new behavior satisfy the requested contract?

Small commits or focused pull requests make those questions easier to answer. The repository's [Conventional Commits](/dkkb/practices/conventional-commits/) guidance can describe intent, but a commit type is not proof that behavior stayed unchanged.

## Trade-offs

Small steps take time and can create temporary intermediate states. The cost is justified when the code is important, actively changing, or difficult to validate in one large operation.

A larger change can be appropriate when an old boundary prevents any safe incremental path. In that case, document the intended contract, use stronger validation, and make the larger risk visible in review.

Tests can also be incomplete or coupled to implementation details. Use code review, contract checks, integration checks, and production verification where the behavior requires them.

:::caution[Passing tests is not proof of equivalence]
A test suite can miss an untested behavior, an integration contract, a timing property, or a data migration consequence. Treat green checks as evidence, then review the actual boundary.
:::

## Failure modes

Unsafe refactoring often includes:

- changing structure and behavior in one opaque diff;
- renaming a public contract without a migration;
- extracting an abstraction before its responsibility is stable;
- relying on tests that assert implementation details;
- keeping a compatibility layer without a removal condition;
- continuing after the diff no longer has one clear purpose.

Use [deterministic tests](/dkkb/testing/deterministic-tests/) when time, randomness, scheduling, or shared state can obscure whether behavior changed.

## Interaction with architecture and review

Refactoring can expose a better module boundary, reduce duplicated knowledge, or make dependency direction clearer. It should not create a new layer only to satisfy a preferred diagram.

Reviewers should compare the before and after contracts, inspect changed side effects, and check whether error, ordering, and persistence behavior remain valid. For a risky boundary, use a characterization or contract test before changing the implementation.

## Practical guidance

Use behavior-preserving refactoring when:

- the code is harder to change than the surrounding requirement;
- duplicated knowledge can drift;
- a boundary hides a meaningful policy;
- tests or review need a clearer unit of behavior;
- a change can be decomposed into verifiable steps.

Stop when the code is clear enough for the next change. Refactoring has reached its purpose when it reduces relevant change risk, not when every imperfection has been removed.
