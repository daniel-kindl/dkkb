---
title: Gate data publication by explicit rights state
description: Do not infer permission to publish data from the fact that the system can store or process it.
type: practice
status: draft
confidence: medium
provenance:
  - derived-guidance
topics:
  - data-governance
  - external-integrations
  - publication
  - security
related:
  - architecture/architecture-boundaries-and-dependency-direction
  - principles/separation-of-concerns
lastReviewed: "2026-09-03"
---

# Gate data publication by explicit rights state

A system can possess data without having permission to expose that data publicly.

Treat publication permission as an explicit state. Do not infer it from data presence, successful ingestion, or successful processing.

## Separate the capabilities

These capabilities are different:

```text
data exists
    !=
data may be stored
    !=
data may be processed
    !=
data may be published
```

A provider agreement, privacy rule, internal policy, or content license can allow one capability while restricting another.

Model the capability that the public read path actually needs.

## Use an explicit rights state

A simple rights state can distinguish at least:

- `allowed`: the system has an affirmative rule that permits publication;
- `denied`: the system has an affirmative rule that prevents publication;
- `unknown`: the system cannot prove either state.

More states can be useful when the domain needs expiry, region, audience, field-level restrictions, or review state. Add them only when they change behavior.

The public path should not treat `unknown` as `allowed`.

:::danger[Unknown is not permission]
Missing rights metadata must not silently become permission to publish.

If the system cannot prove that publication is allowed, omit or block the affected public value.
:::

## Enforce the rule at the publication boundary

Do not rely only on ingestion code to remove restricted values.

Stored data can outlive the code that imported it. Rights can also change after ingestion.

The public read or serialization boundary should verify the publication state before it exposes the value.

This does not require every field to repeat the same policy logic. Centralize the rule at the narrowest boundary that can enforce it consistently.

## Preserve why the state exists

A rights decision should be traceable to its source when practical.

Useful metadata can include:

- provider or source;
- governing policy or agreement identifier;
- scope such as field, record, region, or audience;
- effective or expiry time when relevant;
- review or decision timestamp.

Do not store legal interpretation as an unexplained boolean when later verification matters.

## Handle mixed-source records carefully

A canonical record can contain values from several sources with different publication rights.

Do not assume that one publishable source makes every field publishable. Apply rights to the value or source scope that the policy governs.

A public record can therefore contain some canonical values while withholding others.

## Failure modes

### Presence implies permission

The public serializer exposes any non-null value. Restricted data can leak because ingestion and publication concerns were collapsed.

### Unknown defaults to allowed

Missing rights metadata becomes public output. The system fails open when metadata is incomplete or a new provider is added.

### Rights are checked only during ingestion

A later policy change does not affect already stored data. The public path continues to expose values under an outdated decision.

### Rights are attached only to the canonical entity

Field-level or source-level restrictions disappear when several provider values are merged into one record.

## When a separate rights model is unnecessary

Do not add a complex rights subsystem when all data has one stable publication policy and that policy cannot vary by source or field.

A fixed application rule can be sufficient when the permission boundary is simple and externally guaranteed.

Use explicit rights state when permission can be absent, uncertain, source-specific, field-specific, or change over time.

## Practical rule

Possession is not publication permission.

Make publishability explicit and make public reads fail closed when the required permission cannot be proven.
