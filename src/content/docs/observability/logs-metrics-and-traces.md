---
title: Logs, metrics, and traces
description: Use complementary telemetry signals to understand events, aggregate behavior, and request paths.
type: concept
status: draft
confidence: high
provenance:
  - primary-source
  - literature
  - derived-guidance
topics:
  - observability
  - telemetry
  - reliability
  - performance
related:
  - observability/structured-logging-and-correlation-identifiers
  - performance/measure-before-optimizing
  - reliability/timeouts
  - testing/deterministic-tests
sources:
  - type: primary-source
    title: "OpenTelemetry signals"
    url: "https://opentelemetry.io/docs/concepts/signals/"
    note: OpenTelemetry describes logs, metrics, and traces as distinct telemetry signals that can be used together.
  - type: literature
    title: "Monitoring Distributed Systems"
    url: "https://sre.google/sre-book/monitoring-distributed-systems/"
    note: The Google SRE book explains monitoring system behavior with time-series data, logs, and request-oriented evidence.
---

# Logs, metrics, and traces

Logs, metrics, and traces are complementary ways to observe system behavior.

- A log records an event or observation with context.
- A metric records an aggregated numeric measurement over time.
- A trace follows one operation across boundaries and records timing and outcomes.

No signal answers every operational question. Choose the signal that preserves the evidence needed for the question.

## Choose a signal for the question

| Signal | Useful question | Strength | Common limitation |
| --- | --- | --- | --- |
| Log | What happened for this event? | Detailed context and discrete state changes | Volume, retention cost, and inconsistent fields can reduce value |
| Metric | How much, how often, or how is it trending? | Cheap aggregation and efficient alert evaluation | Aggregation can hide the details of one failing request |
| Trace | Where did this operation spend time or fail? | Request path, timing, and cross-boundary relationships | Collection, propagation, and sampling need consistent design |

A production investigation often starts with a metric that shows a symptom, uses a trace to locate the slow or failing boundary, and uses logs to inspect the relevant event context.

## Design the signals together

Use consistent names and identities across signals:

- a metric should identify the service and operation without creating uncontrolled label cardinality;
- a trace should preserve context across the boundaries that participate in one operation;
- a log should include the identifiers and fields needed to find related traces and metrics;
- each signal should record the time basis and environment needed to interpret it.

The [structured logging and correlation identifiers](/dkkb/observability/structured-logging-and-correlation-identifiers/) entry describes how to connect event records with request context.

## Cardinality, retention, and privacy

Each signal has cost and risk.

High-cardinality metric labels can create excessive storage and query cost. Detailed logs can expose sensitive values or create retention obligations. Traces can contain request attributes that need the same privacy controls as application data.

Define retention and access rules according to operational value and sensitivity. Do not collect a field only because a backend can store it.

:::caution[Telemetry is production data]
Logs, metrics, and traces can contain user, request, or system information. Apply access control, minimization, retention, and deletion rules to telemetry as part of the system's data design.
:::

## Failure modes

Observability becomes weak when:

- every signal uses different service and operation names;
- logs contain prose but no stable fields;
- metrics measure activity rather than user-relevant behavior;
- traces stop at an important integration boundary;
- dashboards collect data without a question or owner;
- sampling removes the only evidence needed for a rare failure;
- telemetry volume grows without retention or cost limits.

More telemetry does not automatically create more understanding. Keep each signal connected to an operational question.

## Relationship to reliability and performance

Telemetry is evidence, not a guarantee that the system is correct. A healthy metric can hide a missing measurement, and a detailed trace can still represent only sampled traffic.

Use observability with [timeouts](/dkkb/reliability/timeouts/), performance measurement, testing, and direct inspection of user-visible behavior. Interpret each signal within the boundary and failure mode it can actually represent.
