# Release operations

DKKB publishes versioned releases through a reviewed Release Please pull request and deploys production only from the resulting published GitHub Release.

## Release lifecycle

1. A change is merged into `main` with the normal pull request, review, and Quality check path.
2. The Release Please workflow reads the Conventional Commit history and opens or updates a release pull request only when release-worthy commits exist.
3. The release pull request updates `version.txt` and [`CHANGELOG.md`](../CHANGELOG.md). Review the generated notes for public impact, breaking changes, and migration guidance.
4. A maintainer confirms the Quality check passes and merges the release pull request.
5. Release Please creates the immutable `vX.Y.Z` tag and the corresponding GitHub Release on the release pull request's merge commit.
6. The Pages workflow receives the `release.published` event, checks out the exact release tag, runs the repository quality gate, builds the static site, deploys the generated Pages artifact, and verifies the public URL.

A normal push to `main` is not a production publication event. Accepted changes can accumulate on `main` until a release-worthy change causes Release Please to prepare a release. Production therefore represents an explicit versioned release rather than the latest arbitrary `main` state.

## Version rules

The manifest starts at `0.1.0`. The workflow uses the documented DKKB SemVer policy:

- `fix` commits normally produce a patch release;
- `feat` commits normally produce a minor release;
- breaking changes use a minor increment while the project is below `1.0.0`;
- breaking changes use a major increment from `1.0.0` onward;
- routine `docs` knowledge-content commits do not release by themselves;
- documentation that changes a stable public or contributor contract must use commit semantics that express the appropriate release impact;
- `refactor`, `test`, `build`, `ci`, `chore`, and `perf` do not release by themselves unless their public effect warrants it;
- stable tags use `vX.Y.Z`; intentional pre-releases remain explicitly managed as `vX.Y.Z-alpha.N`, `vX.Y.Z-beta.N`, or `vX.Y.Z-rc.N`.

The release version is stored in `version.txt` for automation. Git tags and GitHub Releases are the authoritative public release records. Published tags are never moved or deleted.

## Production deployment boundary

Only a published GitHub Release can start the production Pages workflow. The workflow uses the release event's tag name as its checkout ref, so the built and deployed source identity matches the immutable release record.

This boundary has these consequences:

- ordinary merges to `main` do not immediately change the public site;
- a release merge can change both the versioned release record and the public site;
- Pages deployment history can be traced back to one release tag and GitHub Release;
- a production rebuild cannot silently switch to a newer `main` commit because checkout is pinned to the published release tag.

See [Deployment environments and promotion](DEPLOYMENT.md) for the full promotion, recovery, and environment model.

## Generated changelog formatting

`CHANGELOG.md` is owned by Release Please. Release Please can emit adjacent blank lines between generated release-note groups, as observed in PR #135.

DKKB disables Markdownlint rule `MD012/no-multiple-blanks` only for the generated root `CHANGELOG.md`. The same narrow exception applies to `test/fixtures/release-please/CHANGELOG.md`, which deliberately preserves the PR #135 formatting pattern so the normal Markdown lint command verifies the exception.

`MD012` remains enabled for authored Markdown. Other Markdown rules still apply to the changelog. Do not manually normalize generated blank lines only to satisfy `MD012`; review the release note content, version, and release impact instead.

This exception changes formatting validation only. It does not change Release Please configuration, version calculation, generated notes, tags, release publication, workflow permissions, or the Pages deployment path.

## Required repository setup

Configure a repository secret named `RELEASE_PLEASE_TOKEN` before merging a generated release pull request. Use a least-privilege fine-grained token that can read repository metadata and read/write repository contents, issues, pull requests, tags, and releases as required by Release Please. Do not grant package publication or deployment credentials.

The workflow falls back to GitHub's built-in `GITHUB_TOKEN` when the secret is missing, so a missing repository secret does not make the `main` check red. GitHub's built-in token prevents events created by the workflow from starting later workflows, however, so the fallback is not sufficient for normal release-to-production automation: a release created with the built-in token will not reliably trigger the Pages workflow. Configure `RELEASE_PLEASE_TOKEN` before merging a generated release pull request.

Also enable **Allow GitHub Actions to create and approve pull requests** in the repository Actions settings.

An invalid non-empty token still fails the workflow. Correct the repository configuration and rerun the workflow; do not move or reuse a published tag.

Configure the `github-pages` environment to permit deployment only from trusted release tags that match the project's stable release process. Do not permit arbitrary topic branches or ordinary `main` pushes to deploy production.

## Reruns and recovery

Release Please updates the existing release pull request instead of opening conflicting release pull requests. If a run fails before publication, correct the workflow or repository configuration and rerun it. If a release pull request is merged, treat its tag and GitHub Release as immutable and use a new corrective release for any follow-up change.

If a Pages run fails after the GitHub Release is published, rerun the failed Pages workflow for the same immutable release event/tag when GitHub permits it. Do not rebuild from a newer `main` state under the old release identity.

The normal site recovery path is a reviewed fix or revert merged into `main`, followed by a corrective release. A maintainer may redeploy a known-good Pages deployment as an emergency operational recovery action, but repository and production history should converge again through the next explicit release.

## Sources

- [Repository governance](GOVERNANCE.md)
- [Continuous integration contract](CI.md)
- [Deployment environments and promotion](DEPLOYMENT.md)
- [Release Please action](https://github.com/googleapis/release-please-action)
- [Release Please manifest configuration](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md)
- [GitHub Actions release event](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#release)
