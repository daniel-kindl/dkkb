---
title: Service-level indicators and objectives
description: Define measurable user-relevant signals and the target service level they should meet over a stated period.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - literature
  - derived-guidance
topics:
  - observability
  - reliability
  - service-level-objectives
related:
  - observability/logs-metrics-and-traces
  - observability/actionable-alerts
  - reliability/timeouts
  - performance/latency-vs-throughput
sources:
  - type: literature
    title: "Service Level Objectives"
    url: "https://sre.google/sre-book/service-level-objectives/"
    note: The Google SRE book explains service-level indicators, objectives, and error budgets as a basis for reliability decisions.
  - type: literature
    title: "Monitoring Distributed Systems"
    url: "https://sre.google/sre-book/monitoring-distributed-systems/"
    note: The Google SRE book discusses choosing monitoring signals that reflect user-visible service behavior.
lastReviewed: "2026-09-08"
---

# Service-level indicators and objectives

A service-level indicator, or SLI, is a measurement of a service behavior that matters to its users.

A service-level objective, or SLO, is a target for that indicator over a stated time window. An SLO turns a general reliability expectation into a measurable operating decision.

## Start with user-relevant behavior

Useful SLIs commonly measure:

- availability, such as the proportion of eligible requests that return an acceptable result;
- latency, such as the proportion of requests completed below a defined threshold;
- correctness, such as the proportion of responses that satisfy a contract;
- freshness, such as the age of data presented to a reader;
- durability or completion, when the service owns an asynchronous operation.

A metric that is easy to collect is not automatically a useful SLI. Prefer a measurement that represents the outcome the user or dependent system needs.

## Define the full SLO

An SLO needs more than a percentage. Define:

- the population being measured;
- the event that counts as good;
- the time window;
- the target;
- exclusions and maintenance rules;
- the source and calculation method;
- the owner who acts when the target is missed.

For example:

> At least 99.5% of eligible catalog requests return a correct response within 500 milliseconds during each calendar month.

The terms `eligible`, `correct`, and `within 500 milliseconds` need a contract. Without those definitions, two teams can report different values for the same named SLO.

## Error budgets guide decisions

The difference between the target and observed good events is an error budget.

A budget can guide decisions about release risk, reliability work, capacity, and incident response. It does not mean that every failure is acceptable or that teams must spend the entire budget.

Use the budget as an explicit policy. Define what happens when the budget is being consumed faster than planned and who can change that policy.

:::caution[An SLO is not a promise to measure everything]
A small set of meaningful SLOs is more useful than a large set that no owner can interpret or act on. Add an SLO when it changes an engineering or product decision.
:::

## Trade-offs

A stricter target can reduce feature delivery speed, increase capacity cost, or encourage designs that optimize the measured path while neglecting another user need.

A broad SLI can hide important subgroups. A narrow SLI can become noisy or expensive to maintain. State the population and aggregation so the target does not create false confidence.

An SLO is not the same as an SLA. An SLA is an external agreement that can include consequences. An SLO is an internal operating target unless the project explicitly gives it another authority.

## Failure modes

SLO programs fail when:

- the indicator measures internal activity instead of user outcomes;
- success criteria are ambiguous;
- bad or missing telemetry is treated as good service;
- targets are chosen without historical evidence or a decision purpose;
- one global average hides an important region, client, or operation;
- error budgets exist but do not change any action;
- teams create too many objectives to avoid choosing priorities.

The [logs, metrics, and traces](/dkkb/observability/logs-metrics-and-traces/) entry explains how telemetry can provide evidence for an SLI.

## Interaction with testing and delivery

SLOs describe production behavior. They complement tests and CI but do not replace them.

Tests can verify the contract and known failure modes before release. Production SLOs can reveal behavior under traffic, data, dependencies, and conditions that tests did not reproduce.

Use SLO evidence with the repository's delivery and release decisions. Do not treat a green test suite as proof that every production SLO will hold.

## Practical guidance

For each proposed SLO, write:

1. the user or dependent system it protects;
2. the good event and bad event;
3. the population and time window;
4. the target and its decision purpose;
5. the owner and response when the budget is threatened.

Reject an SLO that cannot change a real decision.
