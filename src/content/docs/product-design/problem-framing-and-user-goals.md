---
title: Problem framing and user goals
description: Define the user problem and intended outcome before committing to an interface or implementation solution.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - ux
  - usability
related:
  - product-design/user-centered-design
  - product-design/cognitive-load
  - product-design/recognition-vs-recall
sources:
  - type: primary-source
    title: "ISO 9241-210:2019 Ergonomics of human-system interaction, Part 210: Human-centred design for interactive systems"
    note: Defines human-centred design around users, tasks, context, requirements, design solutions, and evaluation.
  - type: primary-source
    title: "ISO 9241-11:2018 Ergonomics of human-system interaction, Part 11: Usability: Definitions and concepts"
    note: Distinguishes user goals, tasks, context of use, and usability outcomes.
lastReviewed: "2026-09-09"
---

# Problem framing and user goals

Problem framing defines what outcome a user needs, why the current situation prevents that outcome, and which constraints matter before a team selects a solution.

A user goal describes an intended result. A task describes work performed to reach that result. A proposed interface, workflow, or feature is a possible solution rather than the problem itself.

## Separate the goal from the solution

A request such as "add a dashboard" already assumes a solution. The underlying goal might be to notice abnormal system state quickly, compare recent changes, or prepare a recurring report.

A useful problem frame asks:

- who is trying to achieve the goal;
- what outcome they need;
- what task or situation creates difficulty;
- what evidence shows that the difficulty is material;
- what constraints affect an acceptable solution;
- how success can be observed or measured.

This separation keeps alternative solutions available until evidence supports a narrower design.

## Use context of use

The same goal can require different designs for different users or environments. Frequency of use, domain expertise, device constraints, interruption risk, accessibility needs, and consequences of failure can all change the appropriate interaction.

Problem framing should therefore describe relevant context instead of treating a user as an abstract average person.

## Refine the frame with evidence

Initial problem statements are hypotheses. Research, support evidence, usage data, usability tests, and prototype evaluation can show that the original frame was incomplete or wrong.

Revise the frame when evidence changes the understanding of the user, goal, task, or constraint. Do not preserve an early statement only because implementation has already started.

## Failure modes

Common failures include:

- treating a stakeholder request as proof of a user problem;
- defining success only as shipping a feature;
- mixing several unrelated user goals into one workflow;
- describing a solution in problem language;
- ignoring users who operate under different constraints;
- selecting metrics that are easy to collect but unrelated to the intended outcome.

## Limits

Problem framing does not remove product judgment. Evidence can be incomplete, users can have conflicting goals, and a product can have safety, legal, business, or technical constraints that users do not control.

The purpose is to make the intended outcome and assumptions explicit enough to test, not to delay every decision until uncertainty disappears.

## Sources

- ISO. *ISO 9241-210:2019 Ergonomics of human-system interaction, Part 210: Human-centred design for interactive systems*. 2019.
- ISO. *ISO 9241-11:2018 Ergonomics of human-system interaction, Part 11: Usability: Definitions and concepts*. 2018.
