---
title: Threat modeling
description: Identify plausible threats to a system before choosing controls, so security effort targets real risk instead of guesswork.
type: practice
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - security
  - risk-analysis
  - system-design
related:
  - security/defense-in-depth
  - security/least-privilege
  - security/secure-defaults-and-fail-closed-behavior
  - architecture/architecture-boundaries-and-dependency-direction
sources:
  - type: literature
    title: "Threat Modeling: Designing for Security"
    note: Adam Shostack presents a repeatable four-step threat-modeling process built on system decomposition and structured threat enumeration.
  - type: literature
    title: "Threat Modeling Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html"
    note: OWASP describes STRIDE, trust boundaries, decomposition, and how threat modeling fits a development workflow.
lastReviewed: "2026-09-04"
---

# Threat modeling

Threat modeling identifies plausible threats to a system before choosing controls, so security effort targets a system's real risk instead of a generic checklist.

## The problem it addresses

Security controls chosen without analysis tend to follow habit, vendor recommendation, or the last incident someone remembers. Some real threats go unaddressed while effort goes toward risks the system does not actually face.

Threat modeling replaces that guesswork with a structured question: given this system's actual design, what can go wrong, and does it matter enough to address.

## The process

A threat model normally answers four questions:

1. What are we building? Decompose the system into components, data flows, and trust boundaries.
2. What can go wrong? Enumerate plausible threats against each component and boundary.
3. What are we going to do about it? Choose a mitigation, an accepted risk, or a design change for each threat that matters.
4. Did we do a good enough job? Review the model against the finished design and revisit it as the system changes.

STRIDE is a common technique for the second question. It prompts a reviewer to consider spoofing, tampering, repudiation, information disclosure, denial of service, and elevation of privilege for each component and trust boundary.

## Trust boundaries and scope

A trust boundary is a point where data or control crosses between components that do not equally trust each other.

Common examples include a client and a server, two services owned by different teams, or a process and an external dependency.

Threat modeling works at the level of these boundaries. The questions that matter are about what crosses each boundary and under what assumption.

A component diagram that does not mark trust boundaries usually cannot support a useful threat model.

## Trade-offs

Threat modeling takes time from people who understand the system, and its output is only as good as the model's accuracy.

A model built from an outdated design misses the threats that matter in the system as it actually runs.

Deep modeling of every component is rarely worthwhile. Effort should scale with the sensitivity of the data, the exposure of the boundary, and the cost of a plausible failure.

## Failure modes and misuse

Common ways threat modeling fails to deliver value:

- treating a checklist walkthrough as equivalent to reasoning about the specific system's actual design;
- modeling the system once at design time and never revisiting it as the architecture changes;
- listing threats without deciding on a mitigation, an accepted risk, or an owner for each one;
- scoping the model so broadly that no specific, actionable threat comes out of it.

:::tip[A threat model is a living artifact, not a one-time document]
Revisit the model when trust boundaries move, a new external dependency is added, or an incident reveals a threat the model missed.
:::

## Relationship to other practices

Threat modeling identifies which layers a defense-in-depth strategy actually needs and which access a least-privilege grant should exclude.

It gives secure-defaults decisions a concrete threat to justify each closed door, and it depends on architecture boundaries being explicit enough to mark trust boundaries in the first place.

## Sources

- Adam Shostack. *Threat Modeling: Designing for Security*. Wiley, 2014.
- OWASP. "Threat Modeling Cheat Sheet." OWASP Cheat Sheet Series.
