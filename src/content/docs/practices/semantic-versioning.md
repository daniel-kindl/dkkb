---
title: Semantic Versioning
description: Use MAJOR.MINOR.PATCH versions to communicate compatibility expectations for a declared public contract.
type: practice
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - versioning
  - releases
  - compatibility
  - delivery
related:
  - practices/conventional-commits
  - api-design/api-contracts-and-compatibility
  - api-design/api-versioning-and-evolution
  - delivery/continuous-delivery-versus-continuous-deployment
  - delivery/rollback-roll-forward-and-release-verification
sources:
  - type: primary-source
    title: "Semantic Versioning 2.0.0"
    url: "https://semver.org/"
    note: Defines the MAJOR.MINOR.PATCH model, pre-release identifiers, build metadata, and version precedence.
lastReviewed: "2026-09-08"
---

# Semantic Versioning

Semantic Versioning, or SemVer, is a versioning convention for released software with a declared public API or compatibility contract.

A SemVer version has three numeric components:

```text
MAJOR.MINOR.PATCH
```

Increment the components according to compatibility impact:

- increment `MAJOR` for an incompatible change to the public contract;
- increment `MINOR` for backward-compatible added functionality;
- increment `PATCH` for backward-compatible fixes.

The version communicates an expectation about compatibility. It does not prove that the implementation actually preserves compatibility.

## Define the compatibility contract first

SemVer depends on a declared public API.

That API does not need to be an HTTP API. It can include:

- exported library functions and types;
- command-line flags, exit codes, and output formats;
- wire protocols and schemas;
- configuration formats;
- plugin interfaces;
- documented file formats;
- other behavior that consumers are expected to depend on.

Without a defined compatibility boundary, version increments become subjective. Different maintainers can classify the same change differently because they are protecting different contracts.

The [API contracts and compatibility](/dkkb/api-design/api-contracts-and-compatibility/) entry explains how to define a stable external contract.

## Major, minor, and patch changes

### Major

A major version change communicates that existing consumers can require changes before they can safely adopt the new version.

Examples include removing a documented API, changing a field meaning incompatibly, or changing a command contract that scripts depend on.

A major increment should not be avoided only because a larger number looks undesirable. If a stable contract breaks, hiding the break inside a minor or patch release weakens the meaning of every later version.

### Minor

A minor version adds backward-compatible functionality.

Examples include adding an optional capability or a new operation that does not invalidate existing valid usage.

A change that appears additive can still be breaking when consumers exhaustively match a closed set of values or when the contract promises a closed schema. Compatibility depends on the declared contract, not only on the shape of the diff.

### Patch

A patch version contains backward-compatible fixes.

A bug fix can still be breaking if users depend on the old behavior and that behavior was part of the actual supported contract. Classify the compatibility effect, not only the author's intent.

## Versions below 1.0.0

SemVer defines `0.y.z` as initial development. The public API should not be considered stable during this period.

Projects still need a local policy for what minor and patch increments mean before `1.0.0`.

For example, a project can use minor increments for incompatible pre-1.0 changes and patch increments for backward-compatible fixes. That policy is additional project governance, not a separate SemVer rule.

## Pre-release identifiers

A pre-release version adds identifiers after a hyphen:

```text
1.4.0-alpha
1.4.0-beta.2
1.4.0-rc.1
```

A pre-release version has lower precedence than the corresponding normal version.

For example:

```text
1.4.0-rc.1 < 1.4.0
```

Identifiers such as `alpha`, `beta`, and `rc` are conventions. SemVer defines the syntax and precedence rules, but it does not assign lifecycle meaning to those words.

A project should define what each pre-release channel means for support, compatibility, and promotion.

## Build metadata

Build metadata follows a plus sign:

```text
1.4.0+20260908
1.4.0+sha.abc123
```

Build metadata can identify a build without changing version precedence.

Two versions that differ only in build metadata have the same SemVer precedence.

Do not use build metadata to encode an ordering rule that clients must rely on.

## Version precedence

SemVer compares major, minor, and patch numbers numerically from left to right.

When those values are equal:

- a normal version has higher precedence than a pre-release version;
- pre-release identifiers are compared according to the SemVer rules;
- build metadata is ignored for precedence.

This gives deterministic ordering for valid SemVer versions without treating build identity as compatibility significance.

## Different released artifacts

SemVer fits best when consumers select versions and depend on a meaningful compatibility contract.

### Libraries and SDKs

Libraries are a strong fit because downstream software declares dependencies and needs to reason about upgrade compatibility.

### Network APIs

An API can use SemVer for a released API specification, client package, server capability set, or another versioned contract.

Do not assume that an HTTP path such as `/v2` must correspond directly to a SemVer major version. API evolution and package versioning are separate decisions.

### CLI tools

SemVer can describe compatibility of flags, exit behavior, scripting interfaces, configuration, and documented output.

Interactive presentation changes may not be compatibility changes unless the project makes them part of the stable interface.

### Schemas and file formats

SemVer can work when a schema or format has explicit reader and writer compatibility rules.

A format version embedded in stored data can have different lifecycle needs from the application version that produced it.

### Applications and websites

A continuously deployed application can have no external need for a user-visible SemVer version.

If users do not select releases or depend on a versioned interface, a monotonically increasing build or deployment identifier can be more useful operationally.

Do not add SemVer only because the project produces deploys.

## Conventional Commits and version automation

[Conventional Commits](/dkkb/practices/conventional-commits/) can provide structured change intent that release automation maps to version increments.

A common policy maps:

- `fix` to patch;
- `feat` to minor;
- a breaking-change marker to major.

This mapping is not part of SemVer. Conventional Commits describes commit messages, while SemVer describes released version compatibility.

Automation cannot determine every compatibility effect from a commit type. Review the actual public contract before accepting the proposed version increment.

## Tags, releases, and versions

A Git tag can identify the source commit associated with a version. A release record can attach notes, artifacts, checksums, or signatures to that version.

The version, tag, and release record are related identifiers, but they are not the same object.

A deployment can also happen without creating a new SemVer release when the deployed system does not expose a new versioned compatibility contract.

## Common failure modes

### No declared compatibility boundary

Maintainers debate every version increment because nobody can state which behavior consumers are allowed to depend on.

### Accidental breaking change in a minor or patch release

A change looks small internally but removes or reinterprets part of the supported contract.

### Major-version fear

A project keeps incompatible behavior under the same major version to avoid a larger number. Consumers then cannot trust the compatibility signal.

### Version inflation

A project increments versions for every deployment even though consumers do not use the version as a compatibility signal.

### Pre-release labels without policy

`alpha`, `beta`, and `rc` exist in version strings, but users do not know what stability or support they imply.

## Practical guidance

Use SemVer when all of these are true:

1. the released artifact has identifiable consumers;
2. those consumers depend on a declared compatibility contract;
3. maintainers can classify changes against that contract;
4. version numbers help consumers make upgrade decisions.

Use another release or deployment identifier when compatibility signaling is not the problem you need to solve.

## Sources

- [Semantic Versioning 2.0.0](https://semver.org/)
