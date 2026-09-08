---
title: Infrastructure drift and reproducibility
description: Detect when runtime infrastructure diverges from its declared source and restore a reproducible path to the intended state.
type: problem
status: reviewed
confidence: high
provenance:
  - derived-guidance
  - literature
topics:
  - infrastructure
  - drift
  - reproducibility
related:
  - infrastructure/configuration-secrets-and-infrastructure-as-code
  - infrastructure/images-registries-and-immutable-infrastructure
  - delivery/continuous-integration-and-quality-gates
sources:
  - type: literature
    title: "Infrastructure as Code"
    note: Morris explains repeatable infrastructure definitions and the operational risk of configuration that exists only as manual state.
lastReviewed: "2026-09-08"
---

# Infrastructure drift and reproducibility

Infrastructure drift occurs when the running environment differs from the state described by its authoritative configuration or provisioning process.

Drift can come from manual changes, emergency fixes, external controllers, provider defaults, expired resources, or incomplete automation.

## Why drift is dangerous

Two environments that appear to use the same source can behave differently because hidden runtime state has diverged.

This weakens staging confidence, makes incidents harder to reproduce, and makes replacement risky because rebuilding from source may remove the hidden fix.

## Detect desired versus actual state

Infrastructure tooling can compare declared configuration with observed resources and produce a plan or drift report.

The report still needs interpretation. Some differences are expected runtime state and should not be forced back into static configuration.

The system must define which fields are authoritative and which are owned dynamically by another controller.

## Emergency changes create debt

An operator may need to change production directly during an incident.

That can be justified when the normal delivery path is too slow for the risk being addressed.

The direct change should create an immediate follow-up requirement: capture the intended fix in the canonical infrastructure definition, validate it, and remove any temporary exception.

Otherwise the next automated deployment or replacement can silently undo the repair.

## Reproducibility is evidence

A reproducible environment can be recreated from known source, immutable artifacts, configuration, and controlled secrets without relying on undocumented machine history.

Perfect byte-for-byte infrastructure reproduction is not always possible because external resource identifiers and dynamic state change.

The important property is that the engineering process can recreate the intended behavior and policy from authoritative inputs.

## Practical guidance

Make manual production edits observable and exceptional.

Run drift detection where the platform supports it, review changes before applying them, and keep authoritative infrastructure definitions current enough that replacement is safer than preserving an old snowflake instance.
