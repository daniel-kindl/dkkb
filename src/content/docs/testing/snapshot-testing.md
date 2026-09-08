---
title: Snapshot testing
description: Compare structured output with a reviewed stored representation while avoiding broad snapshots that hide meaningful changes.
type: practice
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - testing
  - snapshot-testing
related:
  - testing/testing-strategy
  - testing/deterministic-tests
sources:
  - type: primary-source
    title: "Jest Snapshot Testing documentation"
    url: https://jestjs.io/docs/snapshot-testing
    note: Jest documents the common stored-snapshot workflow and review model.
lastReviewed: "2026-09-08"
---

# Snapshot testing

Snapshot testing stores a known representation of output and compares future output against it.

The stored snapshot becomes an expected artifact that must be reviewed when it changes.

Snapshots are useful when the representation itself is important and a precise manual assertion for every field would be noisy.

## Good snapshot boundaries are focused

A useful snapshot is small enough that a reviewer can understand why each changed line changed.

Examples include:

- a normalized API error object;
- a compiler or parser tree for one input;
- a small rendered component representation;
- a generated configuration fragment;
- a stable serialization format.

A snapshot of an entire large page, database dump, or broad application state can create hundreds of unrelated changes from one intentional edit.

## Update is not verification

The command to regenerate snapshots is not proof that the new output is correct.

A reviewer must inspect the semantic change before accepting the new baseline.

Blindly updating every failing snapshot can preserve a regression as the new expected state.

## Determinism is required

Timestamps, random identifiers, unstable object ordering, environment paths, and other nondeterministic values make snapshots noisy.

Normalize or exclude values that are irrelevant to the contract.

Do not normalize away a value if its stability is itself the behavior being tested.

## Assertions can be clearer

When one or two fields carry the actual invariant, explicit assertions are easier to review than a large snapshot.

Use snapshots for structured representations, not as a universal replacement for intent-revealing assertions.

## Practical guidance

Keep snapshots narrow, deterministic, and committed beside the tests that own them.

Require semantic review of updates. Delete snapshots that change frequently without catching meaningful defects.

If reviewers habitually approve snapshot churn without reading it, the snapshot is no longer providing strong test evidence.
