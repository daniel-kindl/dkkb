---
title: Dependency and software supply-chain security
description: Treat external code, build inputs, artifacts, and automation as trust relationships that need provenance and integrity controls.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - security
  - dependencies
  - supply-chain
related:
  - security/least-privilege
  - security/defense-in-depth
  - delivery/continuous-integration-and-quality-gates
sources:
  - type: primary-source
    title: "NIST SP 800-218: Secure Software Development Framework (SSDF) Version 1.1"
    url: https://csrc.nist.gov/pubs/sp/800/218/final
  - type: primary-source
    title: "SLSA specification"
    url: https://slsa.dev/spec/
    note: SLSA defines provenance and build-integrity concepts for software artifacts.
lastReviewed: "2026-09-08"
---

# Dependency and software supply-chain security

A software supply chain includes the code, dependencies, build tools, actions, registries, artifact stores, signing systems, and automation that influence what finally runs.

Each external input is a trust relationship.

A secure application can still be compromised if an attacker changes a dependency or build artifact before deployment.

## Minimize and understand dependencies

Every dependency adds code, maintainers, release channels, transitive dependencies, and update behavior that the project does not fully own.

Use dependencies when they provide enough value to justify that trust and maintenance cost.

Remove unused dependencies and avoid adding large packages for small functionality when a maintained simpler option already exists.

## Pin reproducible inputs

Version ranges can be useful during development, but production and CI should have a reproducible dependency resolution through an appropriate lockfile or equivalent mechanism.

Automation actions and build tools should be bound to immutable versions where the platform permits it.

A reproducible version identifier is necessary evidence, but it does not prove the dependency is safe.

## Verify provenance and integrity

Artifact hashes, signatures, attestations, and provenance can provide evidence about which source and build process produced an artifact.

The verification policy should identify which builders and publishers are trusted.

Do not collect provenance only as metadata that no deployment gate ever checks.

## Update without blind trust

Security updates reduce known vulnerability exposure, but every update is also new code.

Use automated update proposals, tests, changelog review, and staged rollout according to risk.

Avoid both extremes: never updating dependencies and automatically deploying every upstream release without validation.

## Protect CI authority

Build and release automation often holds repository, registry, or deployment credentials.

Apply [least privilege](./least-privilege.md), isolate untrusted pull-request code from sensitive secrets, and review changes to workflow definitions as security-sensitive code.

## Practical guidance

Keep the dependency graph small enough to understand, resolve builds reproducibly, verify high-value artifact provenance, and make update policy explicit.

Treat build infrastructure as part of the production trust boundary rather than as disposable developer tooling.
