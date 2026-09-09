# Deployment environments and promotion

DKKB is a static Astro site published through GitHub Pages. The repository uses a small environment model because it has one public site, one permanent branch, and no runtime service that needs a shared pre-production system.

## Environment model

| Environment | Purpose | Authority | Public deployment |
| --- | --- | --- | --- |
| Local | Develop and inspect a checkout with Astro and the repository quality commands | The developer running the checkout | No |
| Pull request validation | Validate a proposed change with CI, review, build output, and link checks | The pull request checks and maintainer review | No hosted preview |
| Production | Serve an explicit released site state to readers through GitHub Pages | A published GitHub Release tag created by Release Please | Yes |

DKKB does not maintain a persistent `dev`, `develop`, or staging environment. A pull request has an ephemeral validation context, not a separately hosted site. This keeps the model aligned with the current static site and avoids a second deployment target that could drift from production.

Introduce a persistent staging environment only when the site gains a capability that requires shared pre-production state, production-like integrations, or an approval step that cannot be represented by pull request validation.

## Git ref and deployment mapping

| Git ref or event | Validation | Deployment result |
| --- | --- | --- |
| Short-lived topic branch | Local checks and pull request CI when a pull request exists | No deployment |
| Pull request | `Quality` check, review, and the normal pull request checks | No deployment |
| Push to `main` after merge | CI verification and Release Please evaluation | No production deployment |
| Published `v*` GitHub Release | Pages validates and builds the exact release tag | Automatic production deployment of that released state |
| Manual CI dispatch | Validate the selected ref without publishing it | No deployment |

Production promotion occurs only when Release Please publishes a GitHub Release. Ordinary merges to `main` can therefore accumulate without changing the public site. A release publication binds the public deployment to one immutable version tag and release record.

## Promotion authority

Promotion follows this sequence:

1. A contributor changes a short-lived topic branch.
2. A pull request targets `main`.
3. The required `Quality` check passes and a maintainer reviews the change.
4. The maintainer squash-merges the pull request into `main`.
5. CI validates the updated `main` state.
6. Release Please evaluates accepted commit history and creates or updates a release pull request when release-worthy changes exist.
7. A maintainer reviews and merges the generated release pull request.
8. Release Please creates the immutable `vX.Y.Z` tag and publishes the corresponding GitHub Release on the release merge commit.
9. The Pages workflow starts from the `release.published` event, checks out that exact tag, validates it, builds `dist`, deploys the artifact, and verifies the public URL.

The maintainer controls merge authority. Release Please controls release creation. The Pages workflow can publish only a released tag and does not treat an ordinary `main` push as production authority.

## Build and artifact identity

The Pages workflow builds from the exact tag named by the published GitHub Release. It checks out `github.event.release.tag_name`, records the resolved commit, runs `pnpm check`, and uploads the validated `dist` as one Pages artifact. The artifact name contains the release tag and resolved commit SHA, and its retention is 90 days. The deploy job receives that exact artifact name and does not perform a second source build.

The deployed site is therefore associated with one immutable release tag, one release commit, one GitHub Release, and one Pages workflow run. If validation or build fails, no artifact reaches the deploy job. If deployment fails, the release remains immutable and the failed workflow can be rerun after the operational problem is corrected.

The artifact is scoped to the Pages workflow run. A later platform change may promote an artifact across workflow runs, but it must preserve the same release and commit identity.

## Configuration and secrets

The static site configuration is versioned in the repository. The build must not contain private credentials, tokens, or other secrets. Public configuration can be committed when it is safe for every site visitor to read it.

The Pages build job has read-only repository and Pages metadata permissions. The deploy job has only the Pages and OIDC permissions required by `actions/deploy-pages`. No application secret is currently required. If a future deployment needs a secret, store it in the relevant GitHub Environment and expose it only to the job that needs it.

Environment-specific configuration must be explicit and reviewable. Do not select production behavior from an unreviewed branch name or from a developer-local file.

## GitHub Pages protection

Configure the repository's Pages source as **GitHub Actions**. Configure the `github-pages` environment so only protected release tags created from the trusted release process can deploy to production. Do not allow arbitrary topic branches or ordinary `main` pushes to deploy.

The `github-pages` environment is referenced by the deployment job. Environment deployment restrictions and required reviewers are repository settings, not values that this workflow can safely create. If tag restrictions are configured, they must match the repository's stable `vX.Y.Z` release-tag convention.

## Concurrency

The Pages workflow groups runs by release tag and does not cancel an in-progress deployment. Each release therefore has an isolated deployment run. Published release tags are immutable, so a later release cannot replace the source identity of an earlier in-progress run.

Pull request validation uses the cancellation policy documented in [the CI contract](CI.md). CI and Pages have separate concurrency groups so a validation run cannot cancel a deployment run.

## Roll-forward and rollback

The normal recovery action is a roll-forward:

1. Open a focused fix or revert pull request.
2. Pass the required checks and review.
3. Merge it into `main`.
4. Let Release Please prepare the corrective release.
5. Review and merge the release pull request.
6. Publish the new release and let Pages deploy it.

Never rewrite `main`, move a published tag, or delete release history to recover a deployment. If a Pages deployment fails after a release is published, rerun the failed deployment workflow when GitHub permits it. If the public site needs an immediate return to a previously successful state, a maintainer may redeploy a known-good Pages deployment as an operational recovery action, then follow with a corrective release so repository and production history converge again.

## Post-deployment verification

The Pages workflow performs these checks before and after deployment:

- `pnpm check` validates content, Markdown, tests, the static build, and built links for the exact release tag before artifact upload;
- the build publishes `dkkb-meta.json`, which contains the schema version, application version, release tag, resolved source commit, and content counts;
- the `Verify` job checks the homepage, glossary, knowledge graph, `llms.txt`, `dkkb-index.json`, and `dkkb-meta.json`. It parses JSON responses and checks the expected release and commit identity. Each route has three attempts and a 30-second request timeout;
- visual review and content review remain human responsibilities when a change affects presentation or meaning.

`dkkb-meta.json` is a public machine-readable contract. Its `schema` value identifies the document shape. The `version`, `release`, and `commit` fields identify the deployed source. The content counts are diagnostic and can change when content changes.

The deployment URL is the source for the post-deploy availability check. This avoids hard-coding a second public URL in the workflow when the repository's Pages domain changes.

## Sources

- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Actions deployments and environments](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments)
- [GitHub Actions release event](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#release)
