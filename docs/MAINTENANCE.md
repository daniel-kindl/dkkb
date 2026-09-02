# Maintenance

DKKB is designed for low operational cost and low maintenance.

## Infrastructure

The core project must remain operable with free infrastructure.

The expected production path is GitHub repository, GitHub Actions, static site build, and GitHub Pages.

Do not add a persistent backend, database, CMS, hosted search service, analytics service, or authentication system without a documented need and an explicit project decision.

## Dependencies

Keep the dependency set small. Review dependency updates regularly and prefer grouped updates when the site toolchain can be tested as one unit.

Dependabot can propose dependency updates. CI must validate every update before merge.

Direct dependencies use exact versions. pnpm build-script permissions are explicit in `pnpm-workspace.yaml`. Do not enable install scripts globally.

Remove unused dependencies instead of keeping them for possible future work.

## Runtime

Use the Node.js version in `.nvmrc` for local development and CI. The package manifest defines the minimum supported Node.js version.

Use the pnpm version declared in `package.json`.

## Content maintenance

Update a canonical entry when the current understanding changes. Git history stores old versions.

Do not create `v2`, `new`, or `final` copies to preserve old text. Use `deprecated` only when an entry must remain visible for navigation or historical context, and link it to the replacement when one exists.

Review stable entries when their subject changes materially or when evidence challenges the current guidance. Do not change review dates without reviewing the content.

Review stale external links when they are reported or encountered during normal work. Do not add a scheduled crawler until broken links become a repeated maintenance problem.

## Automation

Keep CI checks deterministic and fast. Add a new check only when it protects a documented repository rule or prevents a repeated defect.
