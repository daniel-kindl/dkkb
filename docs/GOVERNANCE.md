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

The version policy, tag format, and release automation are defined separately by [issue #104](https://github.com/daniel-kindl/dkkb/issues/104). This branch model does not prescribe version numbers or release-note generation.

Branches and deployment environments are separate concepts. A topic branch is not automatically a shared development environment, and a `dev` branch is not required for a staging environment. The environment and promotion policy is tracked separately by [issue #108](https://github.com/daniel-kindl/dkkb/issues/108).

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
