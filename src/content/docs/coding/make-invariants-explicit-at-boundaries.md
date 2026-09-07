---
title: Make invariants explicit at boundaries
description: State and enforce the conditions that must remain true when data enters, changes, or leaves a system.
type: practice
status: draft
confidence: high
provenance:
  - primary-source
  - literature
  - derived-guidance
topics:
  - coding
  - correctness
  - validation
  - boundaries
related:
  - principles/separation-of-concerns
  - problems/race-condition
  - security/secure-defaults-and-fail-closed-behavior
  - testing/contract-testing
sources:
  - type: primary-source
    title: "Design by Contract"
    url: "https://www.eiffel.com/values/design-by-contract/introduction/"
    note: The Eiffel Software description explains preconditions, postconditions, and class invariants as explicit contracts.
  - type: literature
    title: "Object-Oriented Software Construction"
    note: Bertrand Meyer develops design by contract and the use of assertions to make software obligations explicit.
---

# Make invariants explicit at boundaries

An invariant is a condition that must remain true for a valid state or operation.

Make important invariants visible at the boundary where the system can check and protect them. A hidden invariant is easy to violate when another caller or implementation appears.

## Identify the contract

A boundary can be a function, module, API, database write, queue message, or external integration. For each boundary, state:

- what input is accepted;
- what state must already be true;
- what result or state change is guaranteed;
- what failure means when the contract is not satisfied.

For example, an offer repository might require a non-empty game identifier and a non-negative amount. The repository should not accept invalid state and rely on every caller to remember the same rule.

```ts title="offers.ts"
function recordOffer(input: RecordOfferInput): Offer
{
    if (input.gameId === "")
    {
        throw new Error("gameId is required");
    }

    if (input.amountMinor < 0)
    {
        throw new Error("amountMinor must be non-negative");
    }

    return {
        gameId: input.gameId,
        amountMinor: input.amountMinor,
        observedAt: input.observedAt,
    };
}
```

The example makes two preconditions visible. A real system must also decide whether invalid input is rejected with an exception, a result value, an HTTP response, or another error contract.

## Protect the invariant at the right layer

Validate at the boundary that first has enough information to make the decision.

- Parse and validate external data before it enters the domain.
- Check domain invariants where the domain object or operation is created.
- Enforce persistence invariants in the database when concurrent writers can bypass application checks.
- Check authorization at the boundary that owns the protected resource.
- Validate outgoing contracts before sending data to another system when the receiver cannot provide useful diagnostics.

Duplicate checks can be justified when they protect different boundaries. Do not treat an upstream check as proof that every later caller is safe.

The [secure defaults and fail-closed behavior](/dkkb/security/secure-defaults-and-fail-closed-behavior/) entry applies the same boundary idea to security decisions.

## Trade-offs

Explicit checks add code and can duplicate constraints across layers. The benefit is strongest when the invariant protects data integrity, security, interoperability, or a costly state transition.

Do not add assertions for conditions that cannot fail or that no caller can act on. A check that only produces noise trains readers to ignore important failures.

A boundary must also choose an error policy. Rejecting invalid state is useful only when the failure is observable, diagnosable, and handled at an appropriate level.

:::caution[An assertion is not a recovery plan]
An assertion can detect a violated invariant. It does not decide how to recover from corrupted data, an unavailable dependency, or a user-correctable input error.
:::

## Failure modes

Hidden or weak invariants cause:

- invalid state to travel through several layers before failure;
- different callers to enforce different versions of the rule;
- race conditions when a check and state change are not atomic;
- error messages that describe a downstream symptom instead of the violated contract;
- security decisions based on unvalidated or ambiguous input.

A validation check in application code cannot replace an atomic database constraint when concurrent writers can create the same invalid state. See [race condition](/dkkb/problems/race-condition/) for the ordering problem.

## Interaction with testing and review

Tests should name the invariant and exercise both the accepted and rejected boundary cases. Contract tests can verify that an adapter or API implementation preserves the boundary contract.

Reviewers should ask where the invariant is defined, which layer enforces it, and whether concurrent or alternate callers can bypass the check. The answer should be visible in code or in the documented contract.

## Practical guidance

For each important boundary:

1. Write the invariant in plain language.
2. Put the check near the first boundary that can enforce it.
3. Add a stronger storage or protocol constraint when another caller can bypass the application.
4. Return a failure that identifies the violated contract.
5. Test the valid transition, the invalid input, and the relevant concurrent path.

Prefer one explicit contract over several undocumented assumptions.
