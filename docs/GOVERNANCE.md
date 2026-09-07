# Repository governance

DKKB is maintained as a public source of truth. Process exists to protect content quality without adding unnecessary ceremony.

## Main branch

`main` must remain buildable and deployable.

The normal change path is branch, pull request, required checks, review, and squash merge.

## Branch model

DKKB uses a trunk-based branch model:

- `main` is the only permanent repository branch;
- work uses short-lived topic branches created from the current `main`;
- DKKB does not use a persistent `dev` or `develop` integration branch;
- release and hotfix branches are temporary branches for a specific purpose;
- every topic branch should map to one issue and one coherent pull request when the work is issue-backed.

A persistent integration branch is not justified for the current project. DKKB is a static knowledge base with a single public deployment path, a repository-level quality gate, and short-lived changes. A permanent `dev` branch would add divergence and merge work without providing release isolation that the project currently needs.

### Branch names

Use a lowercase type prefix and a short lowercase kebab-case description:

```text
feat/<issue>-<description>
fix/<issue>-<description>
docs/<issue>-<description>
refactor/<issue>-<description>
test/<issue>-<description>
build/<issue>-<description>
ci/<issue>-<description>
chore/<issue>-<description>
perf/<issue>-<description>
revert/<issue>-<description>
```

For issue-backed work, include the issue number. For a small correction that does not require an issue, omit the issue number. Use the type that best matches the change and keep the description specific.

Examples:

- `docs/105-branch-model`
- `ci/107-quality-gates`
- `fix/42-broken-entry-link`

### Branch bases and lifetime

- Create topic, hotfix, and release-preparation branches from the latest `main`.
- Keep a branch focused on one issue or one small correction.
- Update the branch from `main` before final validation when `main` has moved materially.
- Do not create a persistent branch only to group unrelated work.
- Delete a merged topic branch after the pull request is merged.
- Close and delete abandoned branches when their work is no longer active.
- Do not delete `main`.

Topic branches may use force-push with lease when their owner must rebase or revise unpublished history. Do not force-push `main`, a shared long-lived branch, or a branch that another contributor is actively using.

### Hotfixes

A hotfix starts from the latest `main` and uses a `fix/<issue>-<description>` branch. It follows the normal pull request and quality-gate path, but it may receive expedited review when the public site is affected. After the squash merge, the normal `main` deployment path provides the release path.

A hotfix does not require a permanent `hotfix` branch.

### Release preparation

DKKB does not use permanent release branches. Release preparation uses a short-lived topic branch from `main`, then merges the validated result into `main`. Tags and GitHub Releases must identify a specific validated `main` commit.

The version and release policy is defined in the [versioning and release policy](#versioning-and-release-policy) below. Release automation implementation is tracked by [issue #109](https://github.com/daniel-kindl/dkkb/issues/109).

Branches and deployment environments are separate concepts. A topic branch is not automatically a shared development environment, and a `dev` branch is not required for a staging environment. The environment and promotion policy is defined in [deployment environments and promotion](DEPLOYMENT.md) and tracked by [issue #108](https://github.com/daniel-kindl/dkkb/issues/108).

## Versioning and release policy

DKKB uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) to label meaningful published states of the knowledge base and site. SemVer is a communication contract. It does not make an unclear public interface compatible.

### Public compatibility surface

For DKKB, the public compatibility surface includes:

- canonical Markdown content, content IDs, and stable public routes;
- reader-facing site behavior, navigation, and accessibility expectations;
- documented frontmatter and authoring contracts that contributors must follow;
- release and contribution behavior that users or contributors are expected to depend on.

Private scripts, intermediate commits, internal implementation details, and dependency updates without a public effect are not public compatibility surfaces by themselves.

### Version format and authority

Use the normal SemVer form `MAJOR.MINOR.PATCH` without leading zeroes. The `v` prefix is a Git tag convention, not part of the SemVer value.

DKKB remains in major version zero during initial development. The first published release should use `0.1.0`. While the major version is zero, the public contract is not considered stable and incompatible changes may require a minor-version increment.

Git tags and GitHub Releases are the authoritative public release records. DKKB does not use `package.json`'s private package version as a second public release authority. A future automation state file may support release generation, but it must not override the tag and GitHub Release that identify the published state.

### Release impact

Classify a release by the highest-impact change included in the published state:

| Change | Version impact | DKKB examples |
| --- | --- | --- |
| Incompatible public change | Major after `1.0.0`; minor while still in `0.y.z` | remove a stable route without a redirect, remove required frontmatter, or change a documented contributor contract incompatibly |
| Backward-compatible addition | Minor | add a canonical knowledge area, add a new stable route, add optional metadata, or add a backward-compatible site capability |
| Backward-compatible correction | Patch | fix a factual error, broken link, typo, styling defect, or accessibility defect without changing the public contract |
| No public effect | No release by itself | internal refactoring, tests, CI maintenance, dependency maintenance, or build changes that do not alter the published site or contributor contract |

Commit and pull request types provide intent, not an automatic version decision:

- `feat` normally indicates a minor release;
- `fix` normally indicates a patch release;
- `docs` is classified by its public effect. A new canonical entry can be minor, while a correction can be patch;
- `refactor`, `test`, `build`, `ci`, `chore`, and `perf` do not create a release by themselves unless their result changes the public contract or published site;
- `revert` is classified by the public effect of the resulting state;
- `!` or a `BREAKING CHANGE:` footer indicates an incompatible change and requires a major release after `1.0.0`, or the corresponding minor increment during major version zero.

A single release can contain several change types. Use the highest applicable impact, and do not hide a breaking change behind a lower-impact commit type.

### Pre-release policy

Use pre-release identifiers only for an intentional public test release:

```text
v0.2.0-alpha.1
v0.2.0-beta.1
v1.0.0-rc.1
```

Do not publish a pre-release for every pull request or every commit. Use `alpha` for incomplete evaluation, `beta` for a broader but still unstable evaluation, and `rc` when the intended stable scope is complete and only final validation remains.

Pre-release versions have lower precedence than the associated normal version. Build metadata is not used in DKKB release tags because it does not change version precedence. A published tag is immutable. A correction to a pre-release or normal release creates a new version.

### Tags and GitHub Releases

Use these tag formats:

- stable release: `vX.Y.Z`;
- pre-release: `vX.Y.Z-alpha.N`, `vX.Y.Z-beta.N`, or `vX.Y.Z-rc.N`.

Create the tag on the exact validated commit on `main` that is being released. Do not move or delete a published tag. Create one GitHub Release for each published tag and mark pre-releases with GitHub's pre-release flag.

Release notes should include the released version, the release date, user-visible site and knowledge changes, important fixes, breaking changes, upgrade or migration notes when needed, and links to the contributing pull requests. DKKB does not publish a package as part of a site release.

### Release automation

DKKB uses [release-please](https://github.com/googleapis/release-please-action) to prepare releases from the validated `main` history. The [release workflow](../.github/workflows/release-please.yml) runs after pushes to `main` and maintains one release pull request at a time.

The workflow:

- parses accepted Conventional Commits;
- updates `version.txt` and [`CHANGELOG.md`](../CHANGELOG.md) in the release pull request;
- applies the pre-1.0 rule that breaking changes increment the minor version;
- creates the immutable `vX.Y.Z` tag and GitHub Release only after the release pull request is merged;
- does not publish a package or deploy production.

The release pull request must pass the normal Quality check and receive maintainer review. The workflow uses the `RELEASE_PLEASE_TOKEN` repository secret because resources created with GitHub's built-in token do not trigger follow-up workflows. Configure that secret with the least-privilege repository token described in [the release operations guide](RELEASES.md), and enable GitHub Actions to create and approve pull requests in repository settings.

`version.txt` is the release automation's current version marker and the manifest records the same starting version. The immutable tags and GitHub Releases remain the authoritative public records for published states.

## Merge policy

The intended repository settings are:

- require a pull request before merge
- require the main CI quality gate
- require resolved conversations
- require linear history
- block force pushes to `main`
- block deletion of `main`
- allow squash merge
- disable merge commits
- disable rebase merge
- delete head branches after merge

The current repository configuration has squash merging enabled, merge commits disabled, rebase merging disabled, automatic head-branch deletion enabled, and automatic merge disabled. The current connection cannot inspect or change GitHub branch-protection rules or rulesets. Verify those settings manually before relying on them to enforce pull requests, required checks, resolved conversations, and protected-branch restrictions.

Repository settings must enforce these rules where GitHub supports them.

## Review policy

Knowledge review covers technical correctness, context, provenance, source quality, trade-offs, duplication, taxonomy placement, and writing quality.

Infrastructure review covers maintenance cost, security permissions, dependency cost, portability, and effect on free operation.

## Automation

Automation can enforce deterministic rules. It must not be treated as proof that a technical claim is correct.

Do not weaken a quality gate only because a proposed change fails it. Fix the change or justify and review the rule change separately.
