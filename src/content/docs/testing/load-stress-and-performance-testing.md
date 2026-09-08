---
title: Load, stress, and performance testing
description: Measure behavior under controlled demand and distinguish expected-load verification from overload and performance-characterization goals.
type: practice
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - testing
  - load-testing
  - stress-testing
  - performance-testing
related:
  - performance/measure-before-optimizing
  - performance/latency-vs-throughput
  - performance/performance-budgets-and-profiling
  - reliability/load-shedding-and-backpressure
sources:
  - type: literature
    title: "The Art of Application Performance Testing"
    note: Molyneaux describes workload modeling, load generation, monitoring, and performance-test interpretation.
  - type: literature
    title: "Site Reliability Engineering"
    url: https://sre.google/sre-book/handling-overload/
    note: Google SRE connects overload, capacity, latency, and load-shedding behavior.
lastReviewed: "2026-09-08"
---

# Load, stress, and performance testing

Performance-related tests apply controlled workload and observe latency, throughput, errors, resource use, and saturation.

The terms load, stress, and performance testing overlap in industry usage, so a test plan should state its goal instead of relying on the label alone.

## Load testing

Load testing verifies behavior under an expected or planned demand profile.

The workload should represent important request mixes, payload sizes, concurrency, arrival patterns, and dependency behavior.

A test that sends one cheap endpoint at constant rate may produce a high request count while saying little about production capacity.

## Stress testing

Stress testing deliberately moves beyond expected capacity or removes resources to find the system's saturation and failure behavior.

The goal includes questions such as:

- what resource saturates first;
- whether latency degrades gradually or collapses;
- whether queues remain bounded;
- whether overload is rejected safely;
- how the system recovers after demand drops.

Stress testing is not successful because the system never fails. It is useful when the failure mode becomes understood and controlled.

## Performance testing

Performance testing is the broader activity of characterizing whether a system meets performance requirements.

It can include load, stress, endurance, benchmark, scalability, or latency-focused tests depending on the question.

State the metric and acceptance threshold explicitly.

## Test the full bottleneck path

A production service can be limited by CPU, memory, database capacity, connection pools, remote APIs, storage, locks, or queueing.

A load generator that bypasses the real bottleneck can overstate capacity.

Monitor the system and dependencies while applying load.

## Avoid coordinated omission

A closed-loop load generator that waits for one slow response before sending the next request can reduce offered load exactly when the system slows down.

This can hide queueing and tail latency.

Choose an arrival model that matches how real clients generate work.

## Practical guidance

Model representative demand, define the performance question, and capture latency distributions rather than only averages.

Run expected-load tests for capacity confidence and separate stress tests to understand overload behavior.

Use results to refine performance budgets and load-shedding policy rather than treating one maximum requests-per-second number as permanent capacity.
