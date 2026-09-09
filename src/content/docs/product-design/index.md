---
title: Product design
description: Design reasoning for usable software interfaces, interactions, information structures, and design systems.
type: index
status: stable
provenance:
  - derived-guidance
sidebar:
  label: Overview
tableOfContents: false
prev: false
next: false
lastUpdated: false
editUrl: false
---

# Product design

Product design in DKKB covers durable reasoning about user experience, user interfaces, interaction design, information architecture, usability, and design systems.

It explains why interface decisions work, what trade-offs they create, and when common guidance does not apply. It does not treat visual trends, design-tool workflows, or framework-specific frontend implementation as canonical design knowledge.

## Ownership boundaries

Product design owns reasoning about user goals, task flows, information structure, visual hierarchy, interaction patterns, usability evaluation, and reusable design systems.

Accessibility owns normative accessibility requirements and inclusive interaction constraints. Product-design entries cross-link accessibility where visual presentation, semantics, keyboard use, input methods, motion, authentication, or other inclusive-design constraints apply. They do not duplicate the accessibility standard.

Testing owns verification of software behavior and technical quality. Usability evaluation instead studies whether specified users can complete specified tasks effectively and efficiently in context. The two can support each other, but one does not prove the other.

Frontend engineering owns implementation mechanisms such as browser behavior, styling systems, component frameworks, rendering, and platform APIs. Product design defines the intended interaction and information behavior without prescribing one implementation technology.

Architecture owns software and system structure, service boundaries, data flows, runtime concerns, and other technical organization. Product design can constrain architecture when the user experience requires particular behavior, but it does not replace architectural reasoning.

## UI and UX

User experience concerns the complete interaction with a product in context, including goals, flows, states, research evidence, friction, and task completion.

User-interface design concerns the visible and interactive surface, including hierarchy, typography, layout, color, controls, states, and feedback. Interaction design connects the two through behavior over time and across input methods.

DKKB keeps these concerns in one `product-design` knowledge area because they overlap in real product decisions. It does not create independent top-level `ui` and `ux` silos.

## Main areas

- Foundations: user-centered design, cognitive and perceptual principles, affordances, feedback, errors, conventions, mental models, and interaction laws.
- UX: task flows, research evidence, usability testing, onboarding, forms, search and refinement, workflow states, authentication, permissions, and cross-device use.
- UI and interaction design: hierarchy, typography, spacing, responsive layout, semantic color, interaction states, overlays, selection, paging, optimistic behavior, undo, and motion.
- Information architecture and usability: hierarchy, taxonomy, labeling, navigation, findability, dashboards, task metrics, heuristic evaluation, and experiments.
- Design systems: system boundaries, tokens, component contracts, governance, evolution, migration, and when formalization is not justified.
