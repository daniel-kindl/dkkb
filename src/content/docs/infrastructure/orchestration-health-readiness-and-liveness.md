---
title: Orchestration, health, readiness, and liveness
description: Let an orchestrator replace and route workloads using probes that answer distinct operational questions.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - literature
  - derived-guidance
topics:
  - infrastructure
  - orchestration
  - health-checks
related:
  - reliability/circuit-breakers
  - observability/alert-design-and-actionable-signals
  - delivery/rollback-roll-forward-and-release-verification
sources:
  - type: literature
    title: "Site Reliability Engineering"
    url: https://sre.google/sre-book/load-balancing-frontend/
    note: SRE guidance describes health-aware load balancing and the consequences of removing unhealthy backends.
  - type: primary-source
    title: "Kubernetes documentation: Liveness, Readiness, and Startup Probes"
    url: https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/
    note: Kubernetes provides a concrete authoritative example of distinct liveness and readiness semantics.
lastReviewed: "2026-09-08"
---

# Orchestration, health, readiness, and liveness

An orchestrator manages a desired population of workload instances and reacts when actual state differs from that desired state.

It can start, stop, replace, place, and route workloads according to declared policy.

Health signals are useful only when each signal answers a precise question.

## Liveness

Liveness asks whether the process should be considered stuck or irrecoverable enough to restart.

A liveness failure can trigger replacement.

A dependency outage should not automatically make every dependent process fail liveness. Restarting healthy processes during a shared dependency outage can amplify load and destroy useful diagnostic state.

## Readiness

Readiness asks whether the instance should currently receive new traffic or work.

An instance can be alive but not ready while it starts, warms caches, loads required state, drains, or temporarily cannot serve safely.

Removing an unready instance from routing should not necessarily restart it.

## Startup

A startup signal can give slow-starting applications a separate initialization window before normal liveness policy applies.

This prevents a strict liveness probe from repeatedly killing a process that is still making valid startup progress.

## Shallow versus deep health

A shallow process check confirms that the local service can execute its health path.

A deep check may query dependencies.

Deep checks can better represent real serving ability, but they can also create cascading failure when one shared dependency marks every service unready at once.

Choose probe depth from the action the orchestrator takes.

## Orchestration is not application correctness

An orchestrator can replace failed instances and distribute work. It cannot make unsafe application state transitions correct or make a non-idempotent operation safe to repeat.

The application still owns durable state, migration, retries, and domain invariants.

## Practical guidance

Define liveness, readiness, and startup separately.

Make each probe cheap, bounded, and representative of the action attached to it. Observe probe failures and replacement loops because an aggressive health policy can become an outage amplifier.
