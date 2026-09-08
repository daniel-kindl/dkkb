---
title: Progressive disclosure
description: Present the information and controls needed for the current task while keeping less common complexity available when users need it.
type: pattern
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - product-design
  - ux
  - information-architecture
sources:
  - type: literature
    title: "Designing Interfaces"
    note: Jenifer Tidwell describes progressive disclosure as a pattern for managing interface complexity.
lastReviewed: "2026-09-08"
---

# Progressive disclosure

Progressive disclosure keeps the most relevant information and actions available for the current task while making less common or advanced options accessible when needed.

The pattern can reduce initial complexity without removing capability.

## When it helps

Progressive disclosure is useful when:

- most users need a small common subset of available options;
- advanced controls would otherwise compete with primary actions;
- a task naturally moves from general choices to more detailed ones;
- additional information is useful only after a prior decision.

## Trade-offs

Hidden information has a discovery cost. Users can fail to notice that additional capability exists, and repeated disclosure steps can make frequent expert work slower.

Important state, consequences, safety information, and commonly needed controls should not be hidden merely to make a screen appear simpler.

## Practical guidance

Choose what is initially visible from task evidence rather than aesthetic preference. Keep disclosed state predictable, preserve context when a section opens, and make the availability of additional information clear.

For frequently repeated expert workflows, consider shortcuts or persistent expanded state so progressive disclosure does not become repeated friction.

## Failure modes

Common failures include:

- hiding essential information behind vague labels;
- nesting several disclosure levels;
- collapsing content unexpectedly after user input;
- using disclosure to conceal poor information architecture;
- forcing users to reopen the same advanced controls on every visit.

## Sources

- Jenifer Tidwell, Charles Brewer, and Aynne Valencia. *Designing Interfaces: Patterns for Effective Interaction Design*. 3rd ed. O'Reilly Media, 2020.
