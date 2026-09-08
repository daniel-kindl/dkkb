---
title: Images, registries, and immutable infrastructure
description: Build versioned deployable artifacts once and replace runtime instances instead of repairing them in place.
type: practice
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - infrastructure
  - images
  - registries
  - immutable-infrastructure
related:
  - delivery/continuous-delivery-versus-continuous-deployment
  - delivery/rollback-roll-forward-and-release-verification
sources:
  - type: primary-source
    title: "Open Container Initiative Image Format Specification"
    url: https://github.com/opencontainers/image-spec
    note: OCI defines content-addressed image manifests, configuration, and layers.
  - type: literature
    title: "Site Reliability Engineering"
    url: https://sre.google/sre-book/release-engineering/
    note: Google SRE release engineering guidance emphasizes reproducible builds and consistent artifacts.
lastReviewed: "2026-09-08"
---

# Images, registries, and immutable infrastructure

A deployable image captures application files and runtime metadata into a versioned artifact.

A registry stores and distributes those artifacts.

Immutable infrastructure treats a running instance as replaceable: change the source or configuration, build a new artifact, and replace the instance instead of repairing production state manually.

## Artifact identity matters

A tag such as `latest` can move and therefore does not identify one immutable artifact by itself.

Content digests or immutable version references bind deployment to exact bytes.

This makes rollback, audit, and environment comparison more reliable because the system can prove which artifact ran.

## Build once, promote the same artifact

Rebuilding separately for each environment can produce different bytes because dependencies, timestamps, build tools, or remote inputs change.

A safer promotion model builds one validated artifact and moves that same identity through environments while configuration remains environment-specific.

This separates artifact correctness from environment configuration.

## Registries are supply-chain boundaries

A registry controls which artifacts are available for deployment.

Access control, integrity verification, retention, provenance, and vulnerability response matter because a compromised artifact can bypass later application-level protections.

Avoid allowing production to pull mutable references from untrusted publishing paths.

## Immutable does not mean stateless

A replaceable compute instance can still use persistent external state such as databases, object storage, or durable volumes.

The key rule is that machine-local configuration drift is not the authoritative way to change the service.

Persistent data needs its own migration, backup, and recovery lifecycle.

## Practical guidance

Bind releases to immutable artifact identities.

Rebuild from source when change is required, then replace instances through the normal delivery path.

Use emergency in-place repair only as an explicit exception, and reconcile the fix back into source-controlled configuration immediately so the next replacement does not reintroduce the old state.
