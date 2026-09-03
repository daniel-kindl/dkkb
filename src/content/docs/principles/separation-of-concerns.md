---
title: Separate concerns
description: Keep distinct responsibilities behind boundaries that let engineers reason about and change them with limited unrelated impact.
type: principle
status: draft
confidence: high
provenance:
  - primary-source
  - literature
  - derived-guidance
topics:
  - modularity
  - architecture
  - coupling
related: []
sources:
  - type: primary-source
    title: "On the role of scientific thought"
    url: "https://www.cs.utexas.edu/~EWD/transcriptions/EWD04xx/EWD447.html"
    note: Edsger Dijkstra discusses separation of concerns as a method for reasoning about complex subjects.
  - type: literature
    title: "On the Criteria To Be Used in Decomposing Systems into Modules"
    note: David Parnas explains modular decomposition around design decisions that should be hidden from other modules.
lastReviewed: "2026-09-03"
---

# Separate concerns

Separate concerns so that one part of a system can be understood and changed without requiring unrelated details at the same time.

A concern can be a policy, representation, integration, persistence mechanism, user interface, security rule, or other responsibility that changes for its own reasons.

## Context

Separation is valuable when concerns have different change drivers or when one concern exposes implementation detail that other parts do not need.

A boundary can be a module, function, process, interface, data contract, or another structure. The correct boundary depends on the system.

## Benefits

Good separation can:

- reduce the amount of context needed for a change;
- limit the effect of implementation changes;
- make ownership and testing more focused;
- keep policy independent from replaceable mechanisms.

## Trade-offs

Every boundary has a cost. It can add interfaces, data conversion, indirection, deployment coordination, or latency.

Do not split a cohesive unit only to maximize the number of modules or services.

## Failure modes

Poor separation creates modules that know internal details of each other. A small change then crosses many boundaries for reasons unrelated to the feature.

Over-separation creates thin layers that only forward calls. The system gains navigation cost without gaining useful independence.

## Practical guidance

Separate responsibilities when they change for different reasons or when hiding one decision prevents unnecessary coupling. Keep strongly cohesive behavior together when splitting it would not create an independent engineering boundary.

## Sources

- Edsger W. Dijkstra. *On the role of scientific thought*. EWD447.
- David L. Parnas. "On the Criteria To Be Used in Decomposing Systems into Modules." *Communications of the ACM*, 1972.
