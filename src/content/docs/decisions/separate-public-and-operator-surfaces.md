---
title: Separate public and operator surfaces
description: Compare shared and separate interfaces when public users and privileged operators have different trust and deployment needs.
type: decision
status: draft
confidence: medium
provenance:
  - derived-guidance
topics:
  - architecture
  - operations
  - security
  - deployment
related:
  - architecture/architecture-boundaries-and-dependency-direction
  - principles/separation-of-concerns
lastReviewed: "2026-09-03"
---

# Separate public and operator surfaces

A product can expose public functionality and privileged operational functionality through one application or through separate surfaces.

Neither choice is automatically safer or simpler. The decision depends on trust boundaries, deployment needs, operational risk, and maintenance cost.

## Options

### One shared surface

Public and operator features live in the same application and are separated by authorization and navigation.

This can minimize deployment count, duplicated UI code, and operational overhead.

It also means privileged code, routes, and dependencies share the public application's release and failure boundary.

### Separate operator surface

Public and operator interfaces are separate applications or deployment units. They can still use the same backend services and domain model.

This can isolate privileged credentials, operator-only dependencies, release cadence, and access controls.

It also adds another application to build, deploy, monitor, and keep consistent.

### Shared application with isolated modules

A middle option keeps one deployment but uses strong internal modules and authorization boundaries for operator functionality.

This can reduce duplication without creating full deployment isolation.

It does not provide the same blast-radius or credential separation as a separate deployment.

## Decision factors

### Trust boundary

Separate the surfaces when operator access uses stronger credentials, private networks, device restrictions, or administrative permissions that public users must never receive.

A separate frontend is not a security boundary by itself. The backend must still authorize every privileged operation.

### Blast radius

A public UI defect should not automatically block operational access when operators need independent recovery tools.

The reverse also matters. An operator-only dependency or release should not increase public outage risk without a good reason.

Separate deployments can reduce shared failure modes, but they also introduce more infrastructure that can fail independently.

### Release cadence

Operator tooling often changes for operational needs rather than public product releases.

A separate surface can let teams deploy internal workflows without coupling them to public release timing.

A shared surface can be preferable when both areas change together and independent release has little value.

### Code sharing

Separate surfaces do not require duplicated domain logic.

Keep authorization, validation, business rules, and data ownership in shared backend or domain layers where appropriate. Share UI libraries only when that reduces real duplication without coupling release boundaries unnecessarily.

### Observability and auditability

Operator actions often need stronger audit records than public reads.

The architecture should make privileged mutations identifiable regardless of whether the UI is shared or separate.

## Failure modes

### Separate UI is treated as sufficient authorization

The operator application is private, so backend endpoints trust any request that reaches them. A network or configuration mistake can then expose privileged actions.

### Shared UI hides privileged code but does not isolate it

Operator routes are removed from navigation but remain callable without complete authorization checks.

### Separation duplicates business logic

The public and operator applications each implement validation or state transitions independently. Their behavior drifts.

### Separate deployment without a real boundary

The system pays for another application but still shares all credentials, dependencies, failure modes, and release timing.

## Favor a separate operator surface when

A separate surface is useful when several of these conditions apply:

- operator access has materially stronger trust requirements;
- privileged dependencies should not ship to the public client;
- operational access must survive some public-client failures;
- operator workflows need independent deployment;
- the organization can support another application operationally.

## Favor a shared surface when

A shared surface can be better when:

- the operator feature set is small;
- backend authorization already provides the required boundary;
- independent deployment adds little value;
- duplicated application infrastructure would cost more than the isolation provides.

## Practical decision

Separate public and operator surfaces when the trust, release, or failure boundary is materially different.

Keep domain authority and authorization outside the UI so the security model does not depend on which surface sent the request.
