---
title: Fuzz testing
description: Feed large volumes of generated or mutated input into a target to discover crashes, hangs, parser failures, and unsafe edge cases.
type: practice
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - testing
  - fuzzing
  - security
related:
  - testing/property-based-testing
  - testing/deterministic-tests
  - security/threat-modeling
sources:
  - type: literature
    title: "An Empirical Study of the Reliability of UNIX Utilities"
    note: Miller and coauthors demonstrate systematic discovery of crashes by supplying random input to command-line utilities.
  - type: literature
    title: "The Art, Science, and Engineering of Fuzzing: A Survey"
    note: Manes and coauthors survey generation, mutation, coverage guidance, oracles, and modern fuzzing techniques.
lastReviewed: "2026-09-08"
---

# Fuzz testing

Fuzz testing supplies generated or mutated input to a target and looks for failures such as crashes, hangs, memory errors, assertion failures, or violated safety checks.

It is especially useful at parsers, protocol boundaries, file readers, decoders, and security-sensitive input handlers.

## Fuzzing needs an oracle

A fuzzer can easily detect a crash or timeout.

Other defects need stronger oracles, such as:

- an invariant assertion;
- sanitizer-detected memory misuse;
- differential behavior against another implementation;
- parse-serialize round-trip disagreement;
- an impossible state or protocol transition.

Without an oracle, the fuzzer can exercise code heavily while missing incorrect outputs that do not crash.

## Mutation and generation

Mutation-based fuzzers start from seed inputs and modify bytes or structure.

Generation-based fuzzers construct input from a grammar or domain model.

Coverage-guided fuzzers use execution feedback to prefer inputs that reach new program paths.

The best model depends on how structured the input is and how deep valid syntax must be before interesting behavior appears.

## Corpus quality matters

A useful seed corpus is small enough to execute quickly but diverse enough to reach important parsers and states.

Retain minimal inputs that cover distinct behavior instead of collecting every generated file forever.

When a fuzzer finds a defect, add the minimized reproducer to regression tests where the case is stable and important.

## Fuzzing complements validation

A correct validation design specifies what input is accepted.

Fuzzing tests whether the implementation survives inputs outside and around that allowed space.

It is not a replacement for the security boundary. A parser that did not crash can still accept something unsafe.

## Practical guidance

Fuzz the narrowest pure or sandboxed boundary that accepts complex untrusted input.

Make executions bounded, isolate side effects, use sanitizers or invariant assertions where available, and persist minimal reproducible failures.

Treat fuzzing as continuous exploration of edge cases rather than a one-time security ceremony.
