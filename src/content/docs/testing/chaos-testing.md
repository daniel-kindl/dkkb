---
title: Chaos testing
description: Test resilience by introducing controlled failure hypotheses with bounded blast radius and observable stop conditions.
type: practice
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - testing
  - chaos-engineering
  - reliability
related:
  - reliability/circuit-breakers
  - reliability/load-shedding-and-backpressure
  - observability/service-level-indicators-and-objectives
  - testing/testing-strategy
sources:
  - type: primary-source
    title: "Principles of Chaos Engineering"
    url: https://principlesofchaos.org/
  - type: literature
    title: "Chaos Engineering"
    note: Rosenthal, Jones, Casey, and coauthors describe experiment design, steady-state hypotheses, and operational safety.
lastReviewed: "2026-09-08"
---

# Chaos testing

Chaos testing introduces controlled failure or disturbance to test a resilience hypothesis.

The purpose is not to break production for its own sake. It is to discover whether the system preserves an important steady-state behavior when a realistic failure occurs.

## Start with a hypothesis

A useful experiment states:

- the normal steady-state signal;
- the failure being introduced;
- the expected system response;
- the acceptable user impact;
- the stop condition;
- the evidence that confirms or rejects the hypothesis.

For example: if one application instance disappears, successful request rate should remain within the service objective while routing removes the failed instance.

## Blast radius must be bounded

Begin in an environment and scope where unexpected behavior cannot create unacceptable harm.

Possible controls include:

- one instance or one dependency path;
- a small user cohort;
- a short experiment duration;
- automatic rollback or stop triggers;
- direct operator supervision for high-risk experiments.

Increase realism only after the smaller experiment produces enough evidence.

## Chaos requires observability

Without clear service-level and dependency signals, an experiment can create failure without teaching anything.

The system needs enough observability to distinguish expected degradation, unexpected propagation, and unrelated background incidents.

The experiment itself should also be recorded so later analysis can correlate behavior with the injected fault.

## Not every resilience test needs production

Many failure modes can be tested in integration or staging environments first.

Production experiments are valuable when only production scale, topology, traffic, or dependencies expose the real behavior.

Do not use production merely because the word chaos is associated with production systems.

## Practical guidance

Use chaos tests after deterministic failure handling exists and basic reliability checks already pass.

Choose one hypothesis, one controlled fault, and explicit abort conditions.

Turn discovered weaknesses into normal regression tests or operational controls where possible so the same knowledge does not depend on repeating a risky experiment forever.
