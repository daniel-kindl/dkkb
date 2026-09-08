---
title: Design actionable alerts
description: Alert only when a signal requires a timely response from a named owner.
type: practice
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - observability
  - alerting
  - reliability
  - operations
related:
  - observability/service-level-indicators-and-objectives
  - observability/logs-metrics-and-traces
  - observability/production-debugging-with-evidence
  - reliability/circuit-breakers
sources:
  - type: literature
    title: "Practical Alerting from Time-Series Data"
    url: "https://sre.google/sre-book/practical-alerting/"
    note: The Google SRE book explains alert quality, signal selection, paging, and the cost of alert fatigue.
lastReviewed: "2026-09-08"
---

# Design actionable alerts

An alert is actionable when a specific owner can understand the impact and take a timely next step.

An alert is not simply a graph with a threshold. It is an operational contract between a signal, an owner, and a response.

## Alert on a decision

Before creating an alert, define:

- the user or system impact;
- the condition that indicates the impact;
- the time window and required persistence;
- the owner and severity;
- the first response or runbook;
- the escalation path;
- the expected recovery or resolution condition.

Prefer symptoms that represent an important service objective over causes that can occur without user impact. A high CPU value can be useful evidence, but it is not always a production incident.

The [service-level indicators and objectives](/dkkb/observability/service-level-indicators-and-objectives/) entry describes how user-relevant measurements can define a stronger alert boundary.

## Separate response urgency

Not every signal needs an immediate page.

- Page when a human must act now to reduce material impact.
- Create a ticket when work is important but can wait for normal prioritization.
- Record a diagnostic signal when the information is useful during investigation but does not need a separate response.

The labels and channels can vary. The urgency must match the cost of delay.

## Reduce alert noise

Alert quality depends on more than the threshold:

- require a condition to persist long enough to distinguish a transient event;
- use hysteresis or a separate recovery condition when a value can oscillate;
- group related alerts that represent one incident;
- deduplicate repeated notifications;
- suppress dependent symptoms when a known upstream outage explains them;
- include enough context to identify the affected scope;
- measure false-positive and duplicate rates.

Do not make alerts quiet by increasing thresholds until they stop paging. Change the signal, scope, persistence, or response policy.

:::caution[Alert fatigue is a reliability failure]
When operators learn that alerts are usually irrelevant, they delay or ignore the next alert. Treat noisy alerts as an operational defect that needs correction.
:::

## Trade-offs

Sensitive thresholds can detect impact earlier but create more false positives. Conservative thresholds can reduce noise but delay response.

A single alert policy can be simpler to operate but may hide a severe failure in a small population. Separate signals only when the distinction changes the response.

Every alert creates maintenance, routing, testing, and on-call cost. Require a named owner before adding one.

## Failure modes

Poor alerting often creates:

- pages with no description of user impact;
- alerts for every possible internal cause;
- thresholds with no time window;
- recovery notifications that do not identify the original alert;
- alerts nobody owns;
- runbooks that describe commands but not decisions;
- dashboards that are treated as an alert policy.

An alert should direct a response, not require an operator to discover why the alert exists.

## Interaction with debugging

An alert should link to the evidence needed for the first investigation step, such as the affected service, operation, scope, and relevant logs, metrics, and traces.

The [production debugging with evidence](/dkkb/observability/production-debugging-with-evidence/) entry describes how to use those signals without treating one alert as a complete diagnosis.

## Practical guidance

Before publishing an alert, answer:

1. What user or system impact does it represent?
2. Who owns the first response?
3. What action should the owner take?
4. How long can the system remain in this state?
5. What evidence should the responder inspect?
6. How will the alert recover, deduplicate, and avoid repeated noise?

If no timely action follows, use a diagnostic signal or a planned work item instead of an alert.
