# Continuous integration contract

This document defines what DKKB validates, when validation runs, and which workflow owns each responsibility.

## Workflows

| Workflow | Events | Responsibility | Merge gate |
| --- | --- | --- | --- |
| `CI` | Pull requests, pushes to `main`, `v*` tags, and manual dispatch | Run the repository quality gate | The `Quality` job is the required pull request check |
| `Pages` | Pushes to `main` and manual dispatch | Validate and build the site, then deploy the Pages artifact | Not a replacement for the `Quality` check |

DKKB has no persistent `dev`, `develop`, release, or hotfix branch. The branch model is documented in [repository governance](GOVERNANCE.md). A future long-lived branch must be added to workflow triggers deliberately and documented here.

## Quality gate

`pnpm check` is the canonical repository-level quality command. It validates content, lints Markdown, runs tests, builds the site, and validates built links.

The `CI` workflow exposes one stable job name, `Quality`, so branch protection can require that check without depending on step names. The pull request event runs it when a pull request is opened, reopened, or synchronized. A changed title alone does not require a complete quality run because the separate Conventional Commits workflow validates pull request titles.

The same check also runs on pushes to `main` and on version tags. These runs verify integrated and released states; they do not replace pull request review or branch protection. Manual CI dispatch validates the selected ref without deploying it.

## Dependency installation

The repository commits `pnpm-lock.yaml`. Every workflow installs dependencies with:

```text
pnpm install --frozen-lockfile
```

The command fails when the lockfile is missing or does not match `package.json`. Contributors must update the lockfile together with intentional manifest changes. Node.js and pnpm versions are pinned in the workflow and package manifest.

The workflows do not use a dependency cache currently. The repository has one small quality job, and avoiding a cache keeps dependency resolution and failure evidence direct. Add caching only with an explicit lockfile key and a measured maintenance benefit.

## Permissions and action pinning

The `CI` workflow has only `contents: read`. The Pages build job can read repository contents and Pages metadata. The Pages deploy job receives only the `pages: write` and `id-token: write` permissions required by GitHub Pages deployment.

Third-party GitHub Actions are pinned to immutable commit SHAs with a version comment. Do not replace a SHA with a floating tag.

## Concurrency

Pull request runs share a group for the pull request and cancel an older in-progress run when a newer commit arrives. This prevents stale validation from consuming a runner while preserving the newest result.

Runs for `main`, version tags, and manual dispatch are not canceled after they start. They provide evidence for integrated or published refs and must not disappear because another ref started validation.

Pages runs use a workflow-and-ref concurrency group and do not cancel an in-progress deployment attempt. Pages repeats `pnpm check` because it can be manually dispatched and must validate the exact source from which it creates the deployment artifact. This is intentional duplication between an independent deployment workflow and the merge gate.

## Deployment boundary

CI validates code and content. Pages builds and publishes the site. CI does not deploy, and Pages does not create releases. The environment and promotion policy is tracked separately in [issue #108](https://github.com/daniel-kindl/dkkb/issues/108).

## Sources

- [GitHub Actions workflow events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
- [GitHub Actions concurrency](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency)
- [GitHub Actions security hardening](https://docs.github.com/en/actions/learn-github-actions/security-hardening-for-github-actions)
- [pnpm install](https://pnpm.io/cli/install)
