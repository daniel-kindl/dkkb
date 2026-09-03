---
title: Test doubles
description: Replace a production collaborator in a test when control, isolation, observability, or execution cost justifies the substitution.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - testing
  - test-design
  - dependencies
related:
  - testing/unit-integration-and-end-to-end-tests
  - testing/contract-testing
  - testing/deterministic-tests
  - principles/dependency-inversion
sources:
  - type: literature
    title: "xUnit Test Patterns: Refactoring Test Code"
    note: Gerard Meszaros defines the Test Double vocabulary and distinguishes dummies, stubs, spies, mocks, and fakes.
  - type: literature
    title: "Test Double"
    url: "https://martinfowler.com/bliki/TestDouble.html"
    note: Martin Fowler summarizes Meszaros's Test Double vocabulary and the purpose of common double types.
  - type: literature
    title: "Mocks Aren't Stubs"
    url: "https://martinfowler.com/articles/mocksArentStubs.html"
    note: Martin Fowler distinguishes behavior verification with mocks from state verification and other test-double styles.
lastReviewed: "2026-09-03"
---

# Test doubles

A test double replaces a production collaborator during a test. The replacement gives the test control or observability that the real collaborator does not provide cheaply or reliably.

Common kinds include:

| Kind | Main purpose |
| --- | --- |
| Dummy | Fill a required parameter without participating in the test. |
| Stub | Return controlled responses to the system under test. |
| Spy | Record interactions for later inspection. |
| Mock | Define expected interactions that the test verifies. |
| Fake | Provide a working but simplified implementation that is not suitable for production. |

These names describe testing roles. A concrete helper can play more than one role in different tests.

## Problem

A real collaborator can make a test slow, non-deterministic, destructive, expensive, or difficult to configure.

Examples include payment gateways, clocks, message brokers, remote APIs, email delivery, and infrastructure that is costly to create for every test.

A double can let the test exercise the intended behavior without depending on the full production mechanism.

:::caution[Test doubles change what the test proves]
A test against a double proves behavior against the double's contract. It does not prove that the real collaborator behaves the same way.
:::

## What is actually verified

A stub or fake usually supports state-based verification. The test drives the system and checks the resulting state or returned value.

A spy records interactions so the test can inspect them after execution.

A mock makes selected interactions part of the assertion itself.

The useful choice depends on the risk. Do not select a double type only because a mocking library makes it easy to create.

## Appropriate boundaries

Test doubles are useful when they isolate an awkward or expensive boundary. They can also make failure diagnosis more local.

They are less useful when the real collaborator is fast, deterministic, and important to the behavior being verified.

A real in-process collaborator can often provide stronger evidence with less test-specific setup than a detailed mock.

## Strengths and limitations

Doubles can make tests faster, safer, and easier to reproduce. They can also expose rare responses or failures that are difficult to force in a real dependency.

The main limitation is fidelity. A double can drift from the real collaborator or omit behavior that matters in production.

Interaction-heavy mocks can also couple tests to implementation structure. A refactor can then break tests even when externally visible behavior remains correct.

## Failure modes

Common problems include:

- mocking every dependency by default;
- verifying incidental call order that is not part of the required behavior;
- creating a fake whose semantics differ materially from production;
- duplicating large parts of a vendor API in test code;
- using a double to avoid testing a boundary that is itself risky;
- assuming a passing mock-based test proves compatibility with the real dependency.

## Maintenance cost

Every double is test infrastructure that can require updates when contracts change.

Prefer small doubles around stable, meaningful boundaries. Use contract or integration tests when the cost of a mismatch with the real collaborator is material.

## Sources

- Gerard Meszaros. *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley, 2007.
- Martin Fowler. "Test Double." 2006.
- Martin Fowler. "Mocks Aren't Stubs." 2007.
