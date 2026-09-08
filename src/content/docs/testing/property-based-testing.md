---
title: Property-based testing
description: Verify general invariants across generated inputs instead of relying only on a hand-picked list of examples.
type: practice
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - testing
  - property-based-testing
related:
  - testing/deterministic-tests
  - testing/testing-strategy
  - testing/unit-integration-and-end-to-end-tests
sources:
  - type: literature
    title: "QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs"
    note: Claessen and Hughes introduce generated test data, properties, and shrinking as a practical testing model.
lastReviewed: "2026-09-08"
---

# Property-based testing

Property-based testing checks general statements about a system across many generated inputs.

Instead of writing only examples such as "sorting this list returns this result," the test states an invariant such as "the output is ordered and contains the same multiset of elements as the input."

A generator then creates many inputs that satisfy the input domain.

## Properties describe invariants

Useful properties include:

- round trips preserve information;
- serialization followed by parsing reconstructs the value;
- normalization is idempotent;
- ordering functions produce ordered output;
- operations preserve an invariant across many valid states;
- equivalent implementations return equivalent results;
- adding an irrelevant input does not change a result that should be independent of it.

The property must be meaningful. A property that repeats the implementation logic can reproduce the same defect.

## Generators define the explored space

A generator should produce valid and important edge-case inputs rather than only uniform random noise.

Useful generators deliberately include:

- empty and minimum values;
- maximum or near-limit values;
- duplicate data;
- unusual Unicode or encoding cases;
- structurally nested values;
- boundary combinations that are hard to enumerate manually.

Generator quality determines which parts of the state space the test can reach.

## Shrinking improves diagnosis

When a generated case fails, a property-testing tool can try smaller related inputs until it finds a simpler failing example.

A failure from a 500-item structure may shrink to a two-item counterexample that exposes the actual invariant violation.

This makes generated testing useful as a debugging tool rather than only a defect detector.

## Reproducibility matters

Random generation should still produce reproducible failures.

Record or report the seed and the final shrunk example so CI failures can be repeated locally.

The existing [deterministic tests](./deterministic-tests.md) guidance still applies to test infrastructure and environment control.

## Practical guidance

Use property-based testing where the domain has stable invariants and many valid input combinations.

Keep a small set of human-readable example tests for important business scenarios. Property tests complement those examples by exploring combinations that humans are unlikely to enumerate manually.
