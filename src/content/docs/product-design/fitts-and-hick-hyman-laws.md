---
title: Fitts's Law and the Hick-Hyman Law
description: Use movement and choice-time models as design reasoning tools without turning laboratory relationships into universal interface rules.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - ux
  - interaction-design
related:
  - product-design/cognitive-load
  - product-design/affordances-and-signifiers
  - product-design/recognition-vs-recall
sources:
  - type: primary-source
    title: "The information capacity of the human motor system in controlling the amplitude of movement"
    note: Fitts reports the relationship between movement time, target distance, and target tolerance in aimed movement tasks.
  - type: primary-source
    title: "On the rate of gain of information"
    note: Hick studies choice reaction time as a function of information in the available alternatives.
  - type: primary-source
    title: "Stimulus information as a determinant of reaction time"
    note: Hyman studies reaction time under different stimulus probabilities and information conditions.
lastReviewed: "2026-09-09"
---

# Fitts's Law and the Hick-Hyman Law

Fitts's Law and the Hick-Hyman Law are empirical models from human performance research. They can support interface reasoning, but neither model is a universal rule for arranging controls.

## Fitts's Law

Fitts's work models aimed movement as a relationship between movement time, movement distance, and target tolerance. In interface terms, targets that are farther away or harder to acquire generally require more movement time under otherwise comparable conditions.

Practical implications include:

- give frequent or time-sensitive pointer targets enough effective size;
- avoid placing small targets where precision errors have a high cost;
- consider the current pointer or touch position, not only geometric alignment;
- use screen edges and corners deliberately because pointer movement can be constrained by the display boundary;
- account for touch, stylus, mouse, controller, and assistive input differences.

Do not use the model to justify making every important control physically large. Visual hierarchy, available space, accidental activation, target density, and input method also matter.

## Hick-Hyman Law

Hick and Hyman showed that choice reaction time relates to the information in the available alternatives. The result is often simplified into the claim that more choices always make decisions slower.

That simplification is too broad for interface design. Choice difficulty also depends on familiarity, probability, grouping, labeling, search strategy, and whether the user already knows the target.

Practical implications include:

- remove irrelevant choices from the current task;
- group alternatives by meaningful structure;
- use labels that let users distinguish options quickly;
- preserve expert shortcuts when repeated users know the intended action;
- avoid splitting a clear set of choices into extra steps only to reduce the number shown at once.

A long alphabetized list with a known target can be easier than a short list of ambiguous choices.

## Use the laws as models, not scores

The original experiments controlled specific movement or reaction tasks. Real interfaces add perception, memory, semantics, motor variability, interruptions, device constraints, and learned behavior.

Use these models to form and test hypotheses about target acquisition and choice complexity. Do not treat a formula or item count as proof that one interface is better without evidence from the actual task and context.

## Sources

- Paul M. Fitts. "The information capacity of the human motor system in controlling the amplitude of movement." *Journal of Experimental Psychology*, 47(6), 1954.
- W. E. Hick. "On the rate of gain of information." *Quarterly Journal of Experimental Psychology*, 4(1), 1952.
- Ray Hyman. "Stimulus information as a determinant of reaction time." *Journal of Experimental Psychology*, 45(3), 1953.
