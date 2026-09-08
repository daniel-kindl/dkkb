---
title: Debug production behavior with evidence
description: Diagnose production failures by combining scoped observations, explicit hypotheses, and safe verification steps.
type: playbook
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - observability
  - debugging
  - incident-response
  - reliability
related:
  - observability/logs-metrics-and-traces
  - observability/structured-logging-and-correlation-identifiers
  - observability/actionable-alerts
  - testing/deterministic-tests
  - reliability/timeouts
  - performance/measure-before-optimizing
homepage:
  featured: true
  order: 60
sources:
  - type: literature
    title: "Effective Troubleshooting"
    url: "https://sre.google/sre-book/effective-troubleshooting/"
    note: The Google SRE book describes systematic troubleshooting through evidence, hypotheses, and controlled tests.
  - type: literature
    title: "Being On-Call"
    url: "https://sre.google/sre-book/being-on-call/"
    note: The Google SRE book discusses the operational responsibilities and response practices around production failures.
lastReviewed: "2026-09-08"
---

# Debug production behavior with evidence

Production debugging is the process of explaining an observed failure or behavior using evidence from the running system.

The goal is not to find a plausible story quickly. The goal is to reduce uncertainty enough to choose a safe mitigation and a justified corrective action.

## Establish the symptom

Record the first known facts:

- what users or dependent systems observe;
- when the behavior started and whether it is ongoing;
- which operation, region, version, or population is affected;
- the impact and current severity;
- what changed shortly before the symptom appeared.

Separate observation from interpretation. “Requests return 503 in one region” is evidence. “The database is overloaded” is a hypothesis until measured.

## Preserve useful evidence

Before changing the system, preserve the context needed to compare states:

- deployment and configuration changes;
- relevant metric windows before and during the event;
- representative trace identifiers;
- structured logs with timestamps and scope;
- dependency health and timeout behavior;
- data or request characteristics that distinguish affected and unaffected cases.

Respect privacy and retention rules. Do not copy sensitive production data into an uncontrolled workspace only to make analysis easier.

The [structured logging and correlation identifiers](/dkkb/observability/structured-logging-and-correlation-identifiers/) entry explains how identifiers connect evidence across boundaries.

## Form and test hypotheses

Use a short loop:

1. state one hypothesis that could explain the symptom;
2. identify the observation that would support or weaken it;
3. inspect the smallest safe evidence set;
4. update the hypothesis;
5. repeat until the mitigation and cause are sufficiently understood.

Use metrics to establish scope and change, traces to locate time or failure across boundaries, and logs to inspect event context. Do not treat one signal as authoritative when its collection path can fail.

## Mitigate separately from diagnosis

A mitigation reduces current impact. A diagnosis explains why the failure occurred.

Rollback, traffic reduction, a feature-flag change, a dependency timeout, or a capacity adjustment can be a valid mitigation before the root cause is known. Record the change and its expected effect so later evidence remains interpretable.

Do not use an unverified mitigation as proof of root cause. A system can recover because the triggering condition disappeared, not because the chosen explanation was correct.

## Verify safely

Prefer reversible, scoped tests:

- compare affected and unaffected populations;
- reproduce with representative but sanitized inputs;
- inspect one boundary at a time;
- use a canary or limited rollout when a change is required;
- check whether the proposed fix changes the relevant SLI or symptom;
- preserve a rollback path for operational changes.

Avoid broad changes that alter several variables at once. They can hide the cause and make recovery harder.

:::danger[Do not destroy evidence]
Deleting logs, changing retention, restarting components, or applying a broad configuration change can remove the evidence needed to explain an incident. Preserve what is safe and necessary before taking a disruptive action.
:::

## Failure modes

Evidence-driven debugging breaks down when:

- responders anchor on the first plausible cause;
- dashboards show averages that hide the affected population;
- logs have no stable identifiers or timestamps;
- a mitigation and diagnosis are treated as the same claim;
- several changes are made before any effect is measured;
- privacy controls are bypassed during analysis;
- the investigation stops after the service recovers.

Recovery closes the immediate incident. It does not automatically explain the failure or prevent recurrence.

## Relationship to testing and review

A production symptom can identify a missing test, an incorrect assumption, or an observability gap. Add a deterministic regression test when the failure can be represented safely.

Review corrective changes against the evidence that motivated them. Do not add telemetry, alerts, or retries without defining the question or failure mode they address.

## Practical checklist

During an investigation:

1. Describe the observable symptom and scope.
2. Record the relevant time, version, and changes.
3. Preserve logs, metrics, traces, and identifiers within privacy rules.
4. State a testable hypothesis.
5. Choose the smallest safe verification step.
6. Mitigate current impact separately from root-cause analysis.
7. Verify recovery and document remaining uncertainty.
8. Add corrective tests, telemetry, or design changes where the evidence justifies them.
