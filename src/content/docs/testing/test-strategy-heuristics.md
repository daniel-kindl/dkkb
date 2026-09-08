---
title: Test strategy heuristics
description: Use models such as the test pyramid and testing trophy as decision aids rather than universal quotas for test types.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - testing
  - test-pyramid
  - testing-trophy
related:
  - testing/testing-strategy
  - testing/unit-integration-and-end-to-end-tests
  - testing/contract-testing
sources:
  - type: literature
    title: "The Practical Test Pyramid"
    url: https://martinfowler.com/articles/practical-test-pyramid.html
    note: Fowler's site describes the pyramid as guidance toward many fast focused tests and fewer broad expensive tests.
  - type: literature
    title: "Write tests. Not too many. Mostly integration."
    url: https://kentcdodds.com/blog/write-tests
    note: Dodds presents the testing trophy as an alternative emphasis on integration confidence for application testing.
lastReviewed: "2026-09-08"
---

# Test strategy heuristics

A test strategy chooses where to spend verification effort across unit, integration, contract, end-to-end, static, performance, and other checks.

Models such as the test pyramid and testing trophy are heuristics for that distribution.

They are not universal ratios that every repository should reproduce mechanically.

## Test pyramid

The test pyramid encourages many small fast tests, fewer integration tests, and a smaller number of broad end-to-end tests.

Its main insight is economic: broad tests tend to execute more slowly, fail for more environmental reasons, and provide less precise fault localization.

The model is useful when teams have accumulated a slow fragile UI-heavy suite and too little fast behavioral feedback.

## Testing trophy

The testing trophy emphasizes integration tests more strongly, especially for application code where confidence depends on several real modules working together.

Its argument is that tests should resemble real use enough to provide confidence while remaining cheaper and more focused than full end-to-end tests.

## Context changes the shape

A compiler library, a database adapter, a browser application, a distributed service, and infrastructure automation can need different test distributions.

Examples:

- pure algorithms can benefit from dense unit and property tests;
- provider adapters benefit from contract and integration tests;
- browser flows need some end-to-end coverage;
- protocol parsers benefit from fuzzing;
- performance-sensitive services need representative load tests.

The product risk and architecture should shape the suite.

## Optimize for evidence, not counts

A thousand shallow unit tests can provide less confidence than ten meaningful integration tests when the failure risk sits at the integration boundary.

The opposite can also be true when a broad suite repeats the same slow path while missing edge-case logic.

Ask what defect class each layer can detect and how quickly it identifies a regression.

## Practical guidance

Use the pyramid, trophy, and similar diagrams as conversation tools.

Prefer fast deterministic tests where they provide enough evidence. Add broader tests at boundaries where only integrated behavior can prove the contract.

Review the suite when execution cost, flakiness, or escaped defects show that the current distribution is not serving the product risk.
