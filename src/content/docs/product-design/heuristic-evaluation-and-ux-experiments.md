---
title: Heuristic evaluation and UX experiments
description: Use expert heuristics and controlled experiments as evidence tools while stating what each method can and cannot establish about usability.
type: practice
status: reviewed
confidence: high
provenance:
  - primary-source
  - literature
  - derived-guidance
topics:
  - product-design
  - usability
  - experimentation
related:
  - product-design/user-centered-design
  - testing/testing-strategy
sources:
  - type: primary-source
    title: "10 Usability Heuristics for User Interface Design"
    note: Nielsen presents general interaction heuristics intended as broad guidance rather than a complete usability test.
  - type: literature
    title: "Trustworthy Online Controlled Experiments"
    note: Covers online A/B experiment design, metrics, statistics, and common validity failures.
lastReviewed: "2026-09-09"
---

# Heuristic evaluation and UX experiments

Heuristic evaluation and controlled experiments answer different questions. A heuristic review identifies plausible usability problems through expert inspection. An experiment estimates the causal effect of a defined change on measured outcomes under its experimental conditions.

## Heuristic evaluation

A reviewer compares an interface with established principles such as visibility of system status, user control, consistency, error prevention, recognition, and recovery.

Heuristics are prompts for inspection. Passing a checklist does not prove that representative users can complete their tasks. Reviewers can miss domain-specific problems and can flag theoretical violations that do not matter in practice.

Use heuristic evaluation to find issues early, then validate important uncertainties with user evidence where practical.

## A/B testing

A controlled experiment randomly assigns eligible units to variants and compares predefined outcome metrics. It can show whether the tested change caused a measurable difference under the experiment design.

It does not explain every reason for the difference, prove long-term benefit, or establish that an interface is accessible or understandable.

Define the primary outcome, guardrail metrics, population, duration, and stopping rule before reading results. Check instrumentation quality and sample-ratio problems before interpreting statistical significance.

## Do not optimize proxy metrics blindly

A variant can increase clicks by making navigation less clear. A confirmation pattern can reduce completion while preventing expensive mistakes. Metrics need a causal connection to the actual user and product outcome.

## Combine methods

Use inspection, research, usability testing, production behavior, and experiments according to the uncertainty being reduced. No single method is a universal UX quality gate.

## Sources

- Jakob Nielsen. *10 Usability Heuristics for User Interface Design*. Nielsen Norman Group.
- Ron Kohavi, Diane Tang, and Ya Xu. *Trustworthy Online Controlled Experiments*. Cambridge University Press, 2020.
