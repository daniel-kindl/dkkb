# Deployment environments and promotion

DKKB is a static Astro site published through GitHub Pages. The repository uses a small environment model because it has one public site, one permanent branch, and no runtime service that needs a shared pre-production system.

## Environment model

| Environment | Purpose | Authority | Public deployment |
| --- | --- | --- | --- |
| Local | Develop and inspect a checkout with Astro and the repository quality commands | The developer running the checkout | No |
| Pull request validation | Validate a proposed change with CI, review, build output, and link checks | The pull request checks and maintainer review | No hosted preview |
| Production | Serve the validated site to readers through GitHub Pages | The validated `main` branch | Yes |

DKKB does not maintain a persistent `dev`, `develop`, or staging environment. A pull request has an ephemeral validation context, not a separately hosted site. This keeps the model aligned with the current static site and avoids a second deployment target that could drift from production.

Introduce a persistent staging environment only when the site gains a capability that requires shared pre-production state, production-like integrations, or an approval step that cannot be represented by pull request validation.

## Git ref and deployment mapping

| Git ref or event | Validation | Deployment result |
| --- | --- | --- |
| Short-lived topic branch | Local checks and pull request CI when a pull request exists | No deployment |
| Pull request | `Quality` check, review, and the normal pull request checks | No deployment |
| Push to `main` after merge | CI verification and Pages build | Automatic production deployment of the merged state |
| `v*` version tag | CI release-state verification | No additional Pages deployment |
| Manual CI dispatch | Validate the selected ref without publishing it | No deployment |

The only automatic production promotion is a push to `main`. This means knowledge-content changes can reach readers as soon as their reviewed pull request merges. Versioning is a separate concern: a Pages deployment does not imply a version bump, tag, or GitHub Release.

## Promotion authority

Promotion follows this sequence:

1. A contributor changes a short-lived topic branch.
2. A pull request targets `main`.
3. The required `Quality` check passes and a maintainer reviews the change.
4. The maintainer squash-merges the pull request into `main`.
5. CI validates the updated `main` state.
6. The Pages workflow builds the exact `main` commit, uploads its artifact, deploys it, and verifies the public URL.
7. Release Please independently evaluates the accepted commit history and only creates or updates a release pull request when the changes warrant a versioned release.

The maintainer controls merge authority. The Pages workflow controls only deployment after merge. CI and Pages do not bypass review or create a separate production approval path.

## Build and artifact identity

The Pages workflow builds from the exact commit that triggered the `main` push. It runs `pnpm check` before uploading `dist`, and the deploy job requires the build job. GitHub Pages deploys the uploaded artifact from that same workflow run rather than rebuilding it in the deploy job.

The artifact is therefore associated with one `main` commit and one workflow run. If a build fails, no artifact reaches the deploy job. If deployment fails, the source commit remains in `main` and can be corrected or redeployed through the normal operational procedure.

## Configuration and secrets

The static site configuration is versioned in the repository. The build must not contain private credentials, tokens, or other secrets. Public configuration can be committed when it is safe for every site visitor to read it.

The Pages build job has read-only repository and Pages metadata permissions. The deploy job has only the Pages and OIDC permissions required by `actions/deploy-pages`. No application secret is currently required. If a future deployment needs a secret, store it in the relevant GitHub Environment and expose it only to the job that needs it.

Environment-specific configuration must be explicit and reviewable. Do not select production behavior from an unreviewed branch name or from a developer-local file.

## GitHub Pages protection

Configure the repository's Pages source as **GitHub Actions**. Configure the `github-pages` environment to allow deployments from the `main` branch only. Do not allow version tags or arbitrary topic branches to deploy to production.

The `github-pages` environment is already referenced by the deployment job. Environment branch restrictions and required reviewers are repository settings, not values that this workflow can safely create. The current project uses automatic production promotion after the protected-branch review gate; add a required deployment reviewer if the project later needs explicit release approval.

## Concurrency

The Pages workflow groups runs by workflow and Git ref and does not cancel an in-progress deployment. This prevents a deployment that already passed its build from being interrupted. Multiple merges to `main` may therefore complete in order, with the latest successful deployment becoming the final public state.

Pull request validation uses the cancellation policy documented in [the CI contract](CI.md). CI and Pages have separate concurrency groups so a validation run cannot cancel a deployment run.

## Roll-forward and rollback

The normal recovery action is a roll-forward:

1. Open a focused fix or revert pull request.
2. Pass the required checks and review.
3. Merge it into `main`.
4. Let the Pages workflow publish the corrected state.

Never rewrite `main`, move a published tag, or delete history to recover a deployment. If a Pages deployment fails after the commit is merged, rerun the failed workflow or the same workflow run when GitHub permits it. If the public site needs an immediate return to a previously successful state, a maintainer may redeploy the known-good Pages run, then follow with a corrective pull request.

## Post-deployment verification

The Pages workflow performs these checks before and after deployment:

- `pnpm check` validates content, Markdown, tests, the static build, and built links before artifact upload;
- the `Verify` job requests the URL returned by `actions/deploy-pages` with a failing HTTP response check and retries transient availability failures;
- visual review and content review remain human responsibilities when a change affects presentation or meaning.

The deployment URL is the source for the post-deploy availability check. This avoids hard-coding a second public URL in the workflow when the repository's Pages domain changes.

## Sources

- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Actions deployments and environments](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments)
- [GitHub Actions events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
