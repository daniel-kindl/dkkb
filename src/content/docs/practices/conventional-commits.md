---
title: Conventional Commits
description: Use a small, explicit commit message structure to communicate change intent to people and automation.
type: practice
status: draft
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - git
  - collaboration
  - release-engineering
lastReviewed: "2026-09-07"
---

# Conventional Commits

Conventional Commits is a lightweight convention for writing commit messages with a predictable structure.

It gives people and tools a shared way to identify the purpose of a change. It does not define a complete branching model, review process, release process, or versioning policy.

The official specification is [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

## Message structure

A Conventional Commit has this general form:

```text
type(scope): description

optional body

optional footer
```

The scope, body, and footer are optional.

The type is a short noun that identifies the broad intent of the change. The scope gives more local context when it is useful. The description states what changed.

Use a short description that starts after the required colon and space. Do not use the commit type as a substitute for a useful description.

## Types

The specification requires a type but does not define one universal list of types.

The official specification gives these common meanings:

- `feat` adds a feature;
- `fix` corrects a bug;
- other types can be used when a project defines a useful meaning for them.

DKKB's repository policy allows these types:

```text
feat fix docs refactor test build ci chore perf revert
```

DKKB uses the types as signals, not as a complete classification of public impact. For example, a `docs` change can add a new public knowledge entry or correct a typo. The release policy must classify the resulting public effect.

A project can define a different type list. Do not copy DKKB's list into a repository that has different needs.

## Scopes

A scope is an optional noun in parentheses:

```text
feat(parser): accept arrays
fix(auth): reject expired sessions
docs: explain retry budgets
```

Use a scope when it helps a reader locate the affected area. Omit it when the change spans several areas or the scope adds no information.

Scopes are project-specific. They can name a package, subsystem, domain, or other stable boundary. Do not create a new scope for every file or use scopes that only repeat the description.

A scope does not change the meaning of the type. `fix(auth)` is still a fix, and `feat(parser)` is still a feature.

## Description

The description is the short summary after the colon and space.

Prefer a concrete description:

```text
fix: reject expired session tokens
docs: explain bounded collection reads
```

Avoid a description that only repeats the type:

```text
fix: fix things
feat: changes
chore: update
```

A useful description helps a reviewer understand the change without opening the diff. It also gives release notes more useful text when a tool includes the commit in a changelog.

## Body

A body is an optional longer explanation. It starts after one blank line and can contain multiple paragraphs.

Use a body when the reason, constraint, or consequence is not clear from the description:

```text
fix: reject expired session tokens

The previous path accepted a token after its expiry time when the
clock-skew branch was used. Compare the expiry timestamp before
selecting the authenticated session.
```

The body is free-form. Keep it focused on context that helps future readers. Do not repeat the complete diff or use the body to hide a breaking change.

## Footers

A footer starts after one blank line following the body, or after the description when there is no body.

A footer uses a token followed by a colon and space, or a token followed by a space and a hash:

```text
Refs: #123
Reviewed-by: Daniel Kindl
```

Footer tokens normally replace spaces with hyphens. The specification makes an exception for `BREAKING CHANGE` and `BREAKING-CHANGE`.

Use footers for structured metadata that a tool or project process can consume. Keep project-specific footer meanings documented. Git also provides [trailer support](https://git-scm.com/docs/git-interpret-trailers) for structured commit metadata.

## Breaking changes

A breaking change must be marked in the type or scope prefix, or in a footer.

Use `!` immediately before the colon:

```text
feat!: remove the legacy configuration format
feat(api)!: change the pagination contract
```

Or use the `BREAKING CHANGE:` footer:

```text
feat: replace the configuration format

BREAKING CHANGE: the legacy configuration keys are no longer accepted
```

The marker tells tools that the change is incompatible. It does not replace the explanation of what users must change.

Use the footer when the migration detail needs more space. The prefix form is useful when the breaking nature should be visible in a short summary. Both forms can be used together when that improves clarity.

## Valid and invalid examples

The following messages are valid Conventional Commit shapes:

```text
feat(search): add prefix matching

fix: prevent duplicate release notifications

docs: explain the release promotion boundary

refactor(content): separate frontmatter validation

test: cover empty result pagination

ci: pin the Pages deployment action

revert: restore the previous navigation order

fix: prevent a stale response from replacing a newer result

Introduce a request sequence number and ignore responses that
do not match the latest request.

Refs: #42
```

The following messages are invalid or weak:

```text
add search
```

This has no required type and separator.

```text
feat add prefix matching
```

This has a type but no required colon and space.

```text
fix(): handle timeout
```

This uses an empty scope. Omit the scope or provide a meaningful one.

```text
docs: update docs.
```

This is structurally valid, but DKKB's repository policy rejects pull request titles that end with a period. The policy is separate from the Conventional Commits specification.

```text
feature(search): add prefix matching
```

This can be valid under the specification because projects may define their own types, but it is invalid under DKKB's current repository policy because `feature` is not an allowed type.

```text
fix: resolve issue

BREAKING CHANGE the old contract is removed
```

The footer is missing the required colon and space after `BREAKING CHANGE`.

A type is not a quality guarantee. A technically valid message can still be vague, misleading, or incorrectly classified.

## Conventional Commits and SemVer

Conventional Commits and Semantic Versioning work well together, but they are separate conventions.

Conventional Commits describes the change in a commit message. SemVer describes compatibility expectations for a released version. A release tool can map commit types and breaking-change markers to version increments, but the mapping is a project policy or tool behavior.

The usual mapping is:

- `fix` to a patch release;
- `feat` to a minor release;
- a breaking change to a major release.

DKKB adapts the breaking-change mapping while the project is below `1.0.0`: an incompatible public change uses a minor increment. Read the [DKKB versioning and release policy](https://github.com/daniel-kindl/dkkb/blob/main/docs/GOVERNANCE.md#versioning-and-release-policy) for the project-specific rule.

Do not infer a release from a type alone. A `docs` commit can affect the public knowledge base, while a `feat` commit can describe an internal tool. Review the public effect and apply the repository's release policy.

## Conventional Commits and release automation

Structured history can support:

- generated changelog sections;
- candidate version increments;
- release pull requests;
- filtered history for reviewers;
- automation that reacts to selected change types.

Automation must treat commit messages as input, not proof of impact. A parser cannot determine every compatibility change from a short title. Reviewers must correct an inaccurate type, description, or breaking-change classification before release.

DKKB uses [release operations](https://github.com/daniel-kindl/dkkb/blob/main/docs/RELEASES.md) and Release Please to turn accepted history into a reviewed release pull request. Release automation is deliberately separate from the site's production deployment.

## Squash merges and pull request titles

A squash-merge workflow changes where the convention needs the most enforcement.

Intermediate commits in a pull request can describe small experiments, corrections, or implementation steps. The maintainer can squash them into one commit with a final Conventional Commit message that represents the complete change.

The final pull request title is therefore an important enforcement point. DKKB validates pull request titles with a separate workflow and uses the squash merge result as the durable history entry.

This approach reduces the burden on casual contributors without discarding structured history. It also places responsibility on the maintainer to choose an accurate final type, scope, description, and breaking-change marker.

The repository's [governance policy](https://github.com/daniel-kindl/dkkb/blob/main/docs/GOVERNANCE.md) documents the branch, review, squash-merge, and release expectations. The planned [Git branching strategies](https://github.com/daniel-kindl/dkkb/issues/112) and [Git workflows and merge strategies](https://github.com/daniel-kindl/dkkb/issues/113) entries will extend that guidance.

## Trade-offs

Conventional Commits provide useful structure, but they add ceremony and interpretation cost.

### Benefits

- tools can parse the history without guessing the intent of every message;
- reviewers can scan change categories consistently;
- release notes can start from a structured history;
- maintainers can correct the final message during a squash merge;
- contributors receive a shared vocabulary for describing changes.

### Costs

- contributors can spend time debating the type instead of explaining the change;
- a type can create false confidence when the description is vague;
- scopes can become unstable taxonomy that changes with internal refactors;
- automated versioning can produce the wrong result when messages do not reflect public impact;
- strict validation can discourage useful contributions if the process is not explained.

### When the convention is unnecessary

Do not require Conventional Commits for every repository.

A small private repository with no shared history, release process, or automation may gain little from strict syntax. A team can prefer normal descriptive commit messages when human review is enough.

The convention can also be unsuitable when another message format is already required by a tool or organization. Adding a second format creates friction without adding useful information.

Use the convention when the structure supports a real need, such as shared maintenance, release communication, changelog generation, or repository automation.

## Practical checklist

Before finalizing a commit or pull request title, check:

- the type describes the primary intent;
- the optional scope adds useful context;
- the description says what changed;
- a body explains important context when needed;
- a footer records relevant structured metadata;
- a breaking change is marked with `!` or `BREAKING CHANGE:`;
- the message follows the repository's own allowed types and title rules;
- the final title reflects the complete change after squash merging.

## Sources

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html)
- [Git trailers](https://git-scm.com/docs/git-interpret-trailers)
