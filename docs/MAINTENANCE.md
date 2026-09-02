# Maintenance

DKKB is designed for low operational cost and low maintenance.

## Infrastructure

The core project must remain operable with free infrastructure.

The expected production path is GitHub repository, GitHub Actions, static site build, and GitHub Pages.

Do not add persistent services only for convenience. A new service must solve a concrete requirement and must not become an unnecessary source of cost or operational work.

## Dependencies

Review dependency updates monthly. Prefer grouped updates when the site toolchain can be tested as one unit.

Remove unused dependencies instead of keeping them for possible future work.

## Content maintenance

Update canonical entries when the current understanding changes. Git history stores old versions.

Review stale external links when they are reported or encountered during normal work. Do not add a scheduled crawler until broken links become a repeated maintenance problem.

## Automation

Keep CI checks deterministic and fast. Add a new check only when it protects a documented repository rule or prevents a repeated defect.
