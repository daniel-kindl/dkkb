---
title: Deterministic tests
description: Make regression test results depend on controlled inputs and state so a failure remains credible evidence of a problem.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - primary-source
  - derived-guidance
topics:
  - testing
  - determinism
  - reliability
related:
  - testing/test-doubles
  - testing/unit-integration-and-end-to-end-tests
  - testing/testing-strategy
sources:
  - type: literature
    title: "Eradicating Non-Determinism in Tests"
    url: "https://martinfowler.com/articles/nonDeterminism.html"
    note: Martin Fowler describes common causes of non-deterministic tests, including shared state, asynchronous behavior, remote services, time, and resource leaks.
  - type: primary-source
    title: "De-Flake Your Tests: Automatically Locating Root Causes of Flaky Tests in Code At Google"
    url: "https://research.google/pubs/de-flake-your-tests-automatically-locating-root-causes-of-flaky-tests-in-code-at-google/"
    note: Google researchers describe deterministic regression results as an important assumption and study root causes of flaky tests across Google projects.
lastReviewed: "2026-09-03"
---

# Deterministic tests

A deterministic regression test gives the same result when the relevant code, test, inputs, and controlled environment are unchanged.

A test that sometimes passes and sometimes fails without a relevant change is flaky. Flakiness weakens the value of a failure signal because the team cannot immediately trust the result.

## Problem

Automated regression tests are useful when a failure provides credible evidence that something changed or broke.

Non-deterministic failures introduce noise. Teams start rerunning tests, ignoring known flakes, or treating a red build as provisional.

:::caution[Retries do not repair a flaky test]
A retry can collect more evidence, but it does not remove the uncontrolled condition that made the first result unreliable.
:::

## Sources of non-determinism

Common causes include:

- shared mutable state between tests;
- dependence on execution order;
- real clock time, time zones, or timing windows;
- random input without a recorded seed;
- asynchronous work observed through fixed sleeps;
- remote services or unstable networks;
- unisolated files, ports, databases, or global process state;
- resource leaks and incomplete cleanup;
- concurrency races in the test or system under test.

The correct fix depends on which input or state is uncontrolled.

## Control the relevant inputs

A deterministic test should make important inputs explicit or reproducible.

Useful techniques can include:

- create a known fixture for each test or isolated test group;
- inject or control clocks when wall time is not the behavior under test;
- record random seeds so a failure can be reproduced;
- wait on observable completion conditions instead of arbitrary sleeps;
- isolate filesystem, database, and network state where practical;
- replace an unrelated unstable remote dependency with a suitable test double;
- make cleanup failures visible instead of silently contaminating later tests.

Do not remove realism that is required for the risk being tested. A test can be deterministic while still using real infrastructure if that infrastructure is controlled enough for the test purpose.

## What deterministic does not mean

Deterministic does not mean that all tests must use fixed literal data or avoid concurrency.

Property-based and randomized tests can be useful when failures preserve the seed or generated case needed for reproduction.

Performance tests also measure values that naturally vary. Their assertions need statistical or threshold semantics rather than pretending every run is identical.

The key requirement for regression tests is that the pass or fail decision has a controlled explanation.

## Failure modes

Common problems include:

- adding longer sleeps until an asynchronous test usually passes;
- retrying every failed test and hiding the original failure rate;
- allowing tests to depend on state left by earlier tests;
- using the current date or time without controlling boundary cases;
- quarantining flaky tests indefinitely;
- replacing important real boundaries only to make the suite green.

## Maintenance and execution cost

Isolation and reproducibility can require additional fixture setup, test seams, containers, or controlled environments.

These costs should be compared with the cost of unreliable feedback. A fast suite that frequently produces false failures can consume more engineering time than a slightly slower deterministic suite.

When a test becomes flaky, preserve evidence about the failure and fix the uncontrolled condition. Quarantine can limit damage temporarily, but it should not become the permanent state of valuable regression coverage.

## Sources

- Martin Fowler. "Eradicating Non-Determinism in Tests." 2011.
- Celal Ziftci and Diego Cavalcanti. "De-Flake Your Tests: Automatically Locating Root Causes of Flaky Tests in Code At Google." ICSME, 2020.
