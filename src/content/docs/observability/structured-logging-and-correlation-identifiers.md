---
title: Structured logging and correlation identifiers
description: Record machine-readable events and stable request identifiers so related evidence can be found across boundaries.
type: practice
status: draft
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - observability
  - logging
  - distributed-systems
  - privacy
related:
  - observability/logs-metrics-and-traces
  - observability/production-debugging-with-evidence
  - security/threat-modeling
  - testing/deterministic-tests
sources:
  - type: primary-source
    title: "OpenTelemetry Logs Data Model"
    url: "https://opentelemetry.io/docs/specs/otel/logs/data-model/"
    note: OpenTelemetry defines a structured log data model and relationships between log records, resources, and instrumentation.
  - type: primary-source
    title: "Trace Context"
    url: "https://www.w3.org/TR/trace-context/"
    note: The W3C specification defines a standard format for propagating trace context across distributed systems.
---

# Structured logging and correlation identifiers

Structured logging records events as fields with stable names and types instead of requiring a reader or tool to parse changing prose.

A correlation identifier connects evidence produced by one logical operation. A trace identifier can connect logs and spans across services. A request or operation identifier can serve a similar purpose inside a boundary that does not use distributed tracing.

## Use stable event fields

A useful event record normally identifies:

- when the event occurred;
- the service and environment that produced it;
- the event name or operation;
- severity or outcome;
- the relevant request, trace, or operation identifier;
- a bounded set of domain identifiers;
- an error category and safe diagnostic detail when a failure occurred.

For example:

```json
{
  "timestamp": "2026-09-07T10:30:00Z",
  "severity": "error",
  "event": "offer_lookup_failed",
  "service": "catalog-api",
  "environment": "production",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "error_type": "upstream_timeout"
}
```

The exact encoding can vary. The important property is that tools and readers can select fields without interpreting message wording.

## Propagate context at boundaries

Create or accept an identifier at the start of an operation, then propagate it through the participating boundaries.

A correlation identifier should:

- have a defined scope and lifetime;
- be safe to expose to the systems that receive it;
- remain stable for the logical operation;
- be recorded consistently in related logs and traces;
- not be treated as proof of authentication or authorization.

When a downstream system creates its own identifier, record the relationship between the identifiers. Do not overwrite the original context without preserving how the operations relate.

## Keep fields bounded and safe

Structured does not mean unrestricted. Avoid fields that create uncontrolled cardinality, expose secrets, or copy complete request and response bodies into logs.

Do not log passwords, access tokens, private keys, or sensitive personal data unless a documented and reviewed requirement exists. Redaction after collection is weaker than preventing unsafe collection at the source.

Define retention and access policies for the log data. A stable field name is useful only when its meaning, units, and allowed values remain consistent.

The [logs, metrics, and traces](/dkkb/observability/logs-metrics-and-traces/) entry describes how structured logs fit with the other telemetry signals.

## Failure modes

Poor structured logging causes:

- one event to use several names for the same operation;
- fields to change type across versions;
- identifiers to be missing at one integration boundary;
- high-cardinality values to be indexed without a clear investigation need;
- sensitive data to appear in error paths;
- logs to describe a failure without recording its outcome or location.

A correlation identifier helps find related evidence. It does not make an incomplete event useful or explain the underlying failure by itself.

## Interaction with testing and privacy

Tests should verify the stable event contract when logs are part of an operational or compliance interface. Do not make every test depend on timestamps, generated identifiers, or message formatting that is not part of the contract.

Privacy review should cover what is collected, who can access it, how long it is retained, and how it is removed. Treat telemetry as a data flow in the [threat model](/dkkb/security/threat-modeling/).

## Practical guidance

Before adding a field, ask:

1. What operational question does it answer?
2. Is its type, unit, and allowed cardinality defined?
3. Can it contain a secret or sensitive personal value?
4. Can an investigator connect it to related logs, metrics, or traces?
5. Who needs access, and how long should the field be retained?

Keep the event schema small enough that its meaning remains stable.
