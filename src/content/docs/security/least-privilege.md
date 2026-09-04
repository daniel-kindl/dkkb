---
title: Least privilege
description: Grant a subject only the access it needs for its current authorized task, scoped in time and operation, and remove that access when the task ends.
type: principle
status: reviewed
confidence: high
provenance:
  - primary-source
  - literature
  - derived-guidance
topics:
  - security
  - access-control
  - authorization
related:
  - security/defense-in-depth
  - security/secure-defaults-and-fail-closed-behavior
  - security/authentication-vs-authorization
  - ai/agent-boundaries
  - architecture/architecture-boundaries-and-dependency-direction
sources:
  - type: primary-source
    title: "The Protection of Information in Computer Systems"
    url: "https://www.cs.virginia.edu/~evans/cs551/saltzer/"
    note: Saltzer and Schroeder describe least privilege as one of eight design principles for protecting computer-stored information.
  - type: primary-source
    title: "NIST Special Publication 800-53 Revision 5: Security and Privacy Controls for Information Systems and Organizations"
    url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
    note: Control AC-6 requires that users, processes, and devices operate with only the access needed for authorized organizational tasks.
  - type: literature
    title: "OWASP Top 10:2021 - A01 Broken Access Control"
    url: "https://owasp.org/Top10/2021/A01_2021-Broken_Access_Control/"
    note: Lists violation of the principle of least privilege as a common cause of broken access control.
lastReviewed: "2026-09-04"
---

# Least privilege

A subject should hold only the access it needs to complete its current authorized task, scoped by resource, operation, and time. Nothing else follows automatically from a role, a convenience default, or an earlier task.

## The risk it addresses

Excess access does not cause harm on its own, but it enlarges the consequence of every later failure.

A compromised credential, a defect in application logic, or a mistaken action can only reach what the acting subject was allowed to reach.

An attacker who obtains an over-privileged account or token inherits every right that account holds, not only the rights the original task needed.

A defect in an over-privileged batch job can corrupt or expose data that the job never needed to touch.

## The mechanism

Least privilege scopes access along more than one dimension:

- which resources a subject can reach;
- which operations it can perform on those resources, such as read, write, delete, or administer;
- how long the granted access remains valid;
- under which conditions the access applies, such as a specific service, network path, or time window.

A subject can be a human account, a service account, an automated process, or an AI agent with tool access.

The principle applies to all of them. NIST SP 800-53 states this scope explicitly for processes and devices, not only for people.

## Trust boundaries and scope

Least privilege operates at the boundary between a principal and a protected resource.

The access-control decision at that boundary should reflect the minimum right a specific task requires, not the maximum right a role could plausibly use.

Assigning access by broad role instead of by task can satisfy a coarse read of least privilege while still granting far more than most tasks within that role require.

Scoping by task, resource, and time keeps the boundary closer to actual need.

## Trade-offs

Narrow, precisely scoped access adds operational cost. It requires more deliberate provisioning, more frequent requests for additional access, and a process for granting and revoking access as tasks change.

Overly aggressive scoping can also create friction that pushes people toward workarounds, such as shared broad-access accounts or standing exceptions that undermine the intended boundary.

A workable least-privilege design balances precision against the operational cost of managing many narrow grants.

:::caution[Grant time matters as much as grant scope]
Access that stays correct at grant time can become excessive later. A role change, a finished project, or an expired task should trigger revocation. Unrevoked access is a common way least privilege erodes in practice.
:::

## Failure modes and misuse

Common ways least privilege fails in practice:

- privilege creep, where access accumulates across role changes and is never revoked;
- broad roles created for provisioning convenience instead of matching actual task needs;
- standing administrative access used for routine work that does not require it;
- shared credentials that make per-task scoping impossible to enforce or audit;
- treating least privilege as a one-time grant decision instead of an ongoing lifecycle.

Least privilege reduces the blast radius of a failure. It does not prevent every misuse within the granted scope, and it does not replace authentication, monitoring, or the other controls a system needs.

## Relationship to other practices

Least privilege is one layer in a defense-in-depth strategy. It limits what a breach of any single layer can reach.

It depends on authorization to enforce the scoped grant, and it works best paired with secure defaults so that new access starts minimal instead of broad.

Architecture boundaries that separate responsibilities give least privilege a natural place to attach a scoped grant.

## Sources

- Jerome H. Saltzer and Michael D. Schroeder. "The Protection of Information in Computer Systems." *Proceedings of the IEEE*, vol. 63, no. 9, 1975.
- National Institute of Standards and Technology. *NIST Special Publication 800-53 Revision 5: Security and Privacy Controls for Information Systems and Organizations*, control AC-6.
- OWASP. "A01:2021 - Broken Access Control." OWASP Top 10:2021.
