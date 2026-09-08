# Release operations

DKKB deploys the validated `main` branch to GitHub Pages and publishes versioned releases independently through a reviewed Release Please pull request.

## Release lifecycle

1. A change is merged into `main` with the normal pull request, review, and Quality check path.
2. The Pages workflow publishes the validated `main` commit independently of release creation.
3. The Release Please workflow reads the Conventional Commit history and opens or updates a release pull request only when release-worthy commits exist.
4. The release pull request updates `version.txt` and [`CHANGELOG.md`](../CHANGELOG.md). Review the generated notes for public impact, breaking changes, and migration guidance.
5. A maintainer confirms the Quality check passes and merges the release pull request.
6. Release Please creates the immutable `vX.Y.Z` tag and the corresponding GitHub Release on the release pull request's merge commit.

A Pages deployment is not a release event. Routine knowledge-content updates can reach the public site immediately without changing `version.txt`, creating a tag, or publishing a GitHub Release.

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

## Required repository setup

Configure a repository secret named `RELEASE_PLEASE_TOKEN` before merging a generated release pull request. Use a least-privilege fine-grained token that can read repository metadata and read/write repository contents, issues, pull requests, tags, and releases as required by Release Please. Do not grant package publication or deployment credentials.

The workflow falls back to GitHub's built-in `GITHUB_TOKEN` when the secret is missing, so a missing repository secret does not make the `main` check red. GitHub's built-in token prevents events created by the workflow from starting later workflows, however, so a release pull request created during fallback will not receive the normal Quality check automatically and must not be merged until the PAT is configured. Also enable **Allow GitHub Actions to create and approve pull requests** in the repository Actions settings.

An invalid non-empty token still fails the workflow. Correct the repository configuration and rerun the workflow; do not move or reuse a published tag.

## Reruns and recovery

Release Please updates the existing release pull request instead of opening conflicting release pull requests. If a run fails before publication, correct the workflow or repository configuration and rerun it. If a release pull request is merged, treat its tag and GitHub Release as immutable and use a new corrective release for any follow-up change.

The normal site recovery path is a reviewed fix or revert merged into `main`, followed by the Pages workflow. Release publication remains a separate operation and is required only when the corrective change is release-worthy.

## Sources

- [Repository governance](GOVERNANCE.md)
- [Continuous integration contract](CI.md)
- [Release Please action](https://github.com/googleapis/release-please-action)
- [Release Please manifest configuration](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md)
