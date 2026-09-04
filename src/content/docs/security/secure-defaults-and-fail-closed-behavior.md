---
title: Secure defaults and fail-closed behavior
description: Ship a system closed by default, and make an uncertain or failed security decision deny access rather than allow it.
type: principle
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - security
  - defaults
  - failure-handling
related:
  - security/least-privilege
  - security/defense-in-depth
  - security/threat-modeling
  - security/authentication-vs-authorization
  - practices/safe-online-data-migrations
sources:
  - type: primary-source
    title: "The Protection of Information in Computer Systems"
    url: "https://www.cs.virginia.edu/~evans/cs551/saltzer/"
    note: Saltzer and Schroeder describe fail-safe defaults as basing access decisions on explicit permission rather than explicit exclusion.
  - type: primary-source
    title: "Shifting the Balance of Cybersecurity Risk: Security-by-Design and -Default Principles"
    url: "https://www.cisa.gov/news-events/alerts/2023/04/13/shifting-balance-cybersecurity-risk-security-design-and-default-principles"
    note: CISA, NSA, FBI, and international partners describe secure-by-default products that provide protection without extra configuration.
lastReviewed: "2026-09-04"
---

# Secure defaults and fail-closed behavior

A system should ship closed by default, granting access and enabling features only when explicitly configured to do so.

When a security decision cannot complete normally, the system should deny the action rather than allow it.

## The risk it addresses

An open-by-default configuration grants access unless someone remembers to restrict it. Every deployment, every new environment, and every operator who skips a configuration step inherits that open state.

The same problem appears at run time.

A permission check that cannot reach its data source, a timeout during an authorization call, or an unhandled error in a security decision has to resolve one way or the other.

Resolving toward access turns an operational fault into a security bypass.

## The mechanism

Fail-safe defaults, in Saltzer and Schroeder's original formulation, base access decisions on explicit permission rather than explicit exclusion. The default state is no access; a specific grant is required before access exists.

Fail-closed behavior extends the same logic to run-time failure. When a security-relevant check cannot complete, produces an error, or reaches an undefined state, the system treats the request as denied.

```text
Normal path:    check completes -> permit or deny based on the explicit result
Failure path:   check cannot complete -> deny (fail closed)
```

Both apply the same rule at different points: absence of an explicit "allow" means "deny."

## Trust boundaries and scope

Secure defaults apply where a system is provisioned, configured, or deployed, before any specific access decision runs.

Fail-closed behavior applies at the moment an access decision executes and something goes wrong during that execution.

Both protect the same boundary: the point where a request could reach a resource it has not been explicitly permitted to reach.

## Trade-offs

Fail-closed behavior can turn an unrelated operational fault, such as a network partition to a permission service, into a service outage instead of a silent security gap.

That trade favors safety over availability, and it is not free. A dependency failure in the security path can take down functionality that was not itself compromised.

Secure defaults also create friction during setup, because a new feature or integration does nothing until someone deliberately enables it. That friction is a deliberate cost, not an oversight.

## Failure modes and misuse

Common ways this principle breaks down in practice:

- shipping a feature enabled by default because it reduces onboarding friction, then relying on documentation to tell operators to turn it off;
- catching an exception in an authorization check and defaulting to allow because the error path was not designed as carefully as the success path;
- treating a fail-open choice as temporary during development and leaving it in the deployed system;
- applying fail-closed behavior inconsistently, so one code path denies on error while another silently proceeds.

:::danger[An unhandled error in an access check is not neutral]
An access check that raises an exception, times out, or returns an ambiguous result has not answered "no." Treat every non-explicit-allow outcome as a denial.

A default-to-allow error path can turn a transient fault into a security incident.
:::

## Relationship to other practices

Secure defaults give least privilege a starting point of zero access instead of relying on someone to remove excess access later.

Defense-in-depth layers should each fail closed independently, so one layer's failure does not silently disable the others.

A data-migration readiness check is a concrete example of fail-closed design. Verification that cannot prove the new state is ready should keep the existing, known-good path active instead of proceeding on an unproven assumption.

## Sources

- Jerome H. Saltzer and Michael D. Schroeder. "The Protection of Information in Computer Systems." *Proceedings of the IEEE*, vol. 63, no. 9, 1975.
- Cybersecurity and Infrastructure Security Agency, National Security Agency, Federal Bureau of Investigation, and international partners. "Shifting the Balance of Cybersecurity Risk: Security-by-Design and -Default Principles." 2023.
