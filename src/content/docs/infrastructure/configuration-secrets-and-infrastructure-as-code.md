---
title: Configuration, secrets, and infrastructure as code
description: Separate deployable code from environment policy while keeping sensitive values controlled and infrastructure changes reproducible.
type: practice
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - infrastructure
  - configuration
  - secrets
  - infrastructure-as-code
related:
  - security/least-privilege
  - security/secure-defaults-and-fail-closed-behavior
  - delivery/continuous-integration-and-quality-gates
sources:
  - type: literature
    title: "The Twelve-Factor App: Config"
    url: https://12factor.net/config
    note: Twelve-Factor separates deploy-varying configuration from application code.
  - type: literature
    title: "Infrastructure as Code"
    note: Morris describes managing infrastructure definitions through versioned, testable automation instead of manual configuration.
lastReviewed: "2026-09-08"
---

# Configuration, secrets, and infrastructure as code

Configuration changes how one built application behaves in a specific environment.

Secrets are sensitive configuration values or credentials whose disclosure creates security risk.

Infrastructure as code represents infrastructure intent in version-controlled definitions that can be reviewed and applied reproducibly.

## Keep artifact and environment policy separate

Environment-specific hostnames, capacity, feature policy, credentials, and endpoints should not require rebuilding application source when they are genuinely deployment configuration.

At the same time, moving every application rule into configuration can make behavior difficult to test and understand.

Use configuration for values that legitimately vary by deployment or operational policy.

## Secrets need stronger controls

A secret should not be committed to normal source control, baked into a public image layer, printed in logs, or copied broadly into environments that do not need it.

Apply [least privilege](../security/least-privilege.md) to both who can read a secret and which workload receives it.

Rotation should be possible without changing unrelated application code.

## Infrastructure as code reduces hidden state

Declarative or scripted infrastructure definitions make desired configuration reviewable and repeatable.

The code can describe networks, compute, policies, service wiring, and other resources depending on the platform.

This does not mean every runtime fact belongs in Git. Dynamic service state and secrets often need separate systems of record.

## Plans need verification

An infrastructure change can be syntactically valid and still remove the wrong resource, broaden network access, or exceed capacity limits.

Review the semantic plan, use policy checks where they prevent repeated mistakes, and verify the deployed result.

## Practical guidance

Keep normal configuration explicit, secrets controlled, and infrastructure intent versioned.

Avoid hand-editing production infrastructure as the routine workflow. When emergency changes are necessary, reconcile them back into the authoritative definition so drift does not become permanent.
