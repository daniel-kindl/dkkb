# Maintenance

DKKB is designed to require little operational maintenance.

## Infrastructure

The project must remain usable without paid runtime infrastructure.

The expected runtime services are:

- GitHub for source control and collaboration;
- GitHub Actions for validation and deployment;
- GitHub Pages for static hosting.

Do not add a persistent backend, database, CMS, hosted search service, analytics service, or authentication system without a documented need and an explicit project decision.

## Dependencies

Keep the dependency set small.

Dependabot can propose dependency updates. CI must validate every update before merge.

Direct dependencies use exact versions. pnpm build-script permissions are explicit in `pnpm-workspace.yaml`. Do not enable install scripts globally.

## Runtime

Use the Node.js version in `.nvmrc` for local development and CI. The package manifest defines the minimum supported Node.js version.

Use the pnpm version declared in `package.json`.

## Content maintenance

Update a canonical entry when the current understanding changes. Do not create `v2`, `new`, or `final` copies to preserve old text. Git already preserves history.

Use `deprecated` only when an entry must remain visible for navigation or historical context. Link it to the replacement when one exists.

## Review

Review stable entries when their subject changes materially or when evidence challenges the current guidance. Do not change review dates without reviewing the content.
