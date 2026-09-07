# Contributing to DKKB

DKKB accepts corrections, new knowledge entries, source improvements, taxonomy changes, and project maintenance changes.

## Before you start

1. Search for an existing canonical entry.
2. Update the existing entry when it already covers the subject.
3. Create a new entry only when it represents a distinct concept, problem, or engineering decision.
4. Read the writing and source policies before you write substantial content.

Use these project documents:

- [Writing standard](docs/WRITING_STANDARD.md)
- [Source policy](docs/SOURCE_POLICY.md)
- [Content model](docs/CONTENT_MODEL.md)
- [Presentation conventions](docs/PRESENTATION.md)
- [Diagram conventions](docs/DIAGRAMS.md)
- [Governance](docs/GOVERNANCE.md)

## When an issue is required

Small corrections do not need a separate issue. Examples include typos, wording corrections, broken links, source improvements, and small clarifications to an existing entry.

Open an issue before work starts when a change adds a substantial canonical entry, adds a top-level category or entry type, changes the taxonomy, changes a writing or source policy, or changes project architecture or tooling.

The issue should define the knowledge gap or project problem before implementation starts.

## Content rules

- Use Markdown files only for canonical knowledge.
- Use lowercase kebab-case file names.
- Add valid YAML frontmatter to each published entry.
- Keep one canonical entry for one concept.
- Link related knowledge instead of copying the same explanation.
- Use canonical content IDs in `related` metadata.
- State context and trade-offs when guidance is conditional.
- Follow the approved Markdown presentation conventions when using asides, code blocks, file trees, procedures, or callouts.
- Format DKKB-authored curly-brace code examples with Allman block braces, 4-space indentation, and spaces rather than tab characters.
- Use Starlight Markdown asides only for short secondary information.
- Use fenced Markdown code blocks, fenced text file trees, and normal ordered lists instead of MDX-only Starlight components.
- Do not use Starlight component imports or custom icons in canonical entries.
- Prefer Mermaid for technical diagrams when a diagram materially improves understanding.
- Keep essential meaning in prose and do not rely on diagram color alone.
- Do not use a hosted diagram-rendering service for canonical content.
- Do not present personal experience as universal evidence.
- Do not invent citations or source details.
- Do not copy substantial text, diagrams, or other protected material from copyrighted sources.
- Do not create bookmark dumps or "awesome" lists as knowledge entries.
- Do not add MDX unless the repository policy changes first.

## Content Definition of Done

A substantial entry is ready for `reviewed` or `stable` status only when the applicable checks below are satisfied:

- no existing canonical entry already owns the subject;
- the entry states the problem, purpose, or decision it helps with;
- recommendations include relevant context and limits;
- important trade-offs are documented;
- factual technical claims are verified;
- primary sources are preferred when they are available and appropriate;
- personal experience is identified explicitly;
- derived guidance makes its reasoning visible when needed;
- related canonical entries are linked where useful;
- presentation features are purposeful and the entry remains understandable without Starlight-specific styling;
- DKKB-authored code examples follow the applicable code-style rules;
- diagrams, when present, agree with the prose and remain understandable without color alone;
- the text follows the DKKB writing standard;
- the entry remains useful as plain Markdown without the generated website;
- CI passes.

Not every entry needs every article section. Do not add empty sections only to satisfy this checklist.

## Change process

1. Create a branch from the current `main` branch.
2. Make one coherent change.
3. Run `pnpm check`.
4. Open a pull request.
5. Resolve review comments and required checks.
6. Squash merge after approval.

Direct changes to `main` are not part of the normal workflow.

## Pull request workflow

The normal contribution lifecycle is:

1. Select an open issue with no unresolved blocker.
2. Create a short-lived topic branch from the latest `main`, following the [branch model](docs/GOVERNANCE.md).
3. Make one coherent change and keep the branch focused on the selected issue.
4. Run `pnpm check` and inspect the result.
5. Open a pull request against `main` with the required title and body information.
6. Keep the pull request in draft state until the change is ready for review.
7. Resolve review comments, update the branch when needed, and wait for required checks.
8. Squash merge after the required review and validation state is complete.
9. Verify that the issue, branch, and deployment state have the expected result.

### Issue and branch selection

Work on one issue per branch and pull request unless a maintainer explicitly groups tightly coupled changes. Do not start work on an issue with an open blocker. If a new blocker appears, record it on the issue or pull request and stop at the boundary of the blocked work.

Create issue-backed branches from the latest `main`. Use the branch names defined in [repository governance](docs/GOVERNANCE.md). The pull request should link the issue with a closing reference such as `Fixes #123` when the change completely resolves it.

### Keeping a branch current

Before final validation, update the topic branch when `main` has moved in a way that can affect the change.

- Prefer rebasing an unpublished branch that has one owner.
- Use `git push --force-with-lease` after rebasing an owned branch.
- Do not rebase or force-push a branch that another contributor actively uses.
- Merge the current `main` into a shared branch when rewriting its history would be unsafe.
- Resolve conflicts on the topic branch, explain non-obvious resolutions in the pull request, and run `pnpm check` again.

A pull request must not be merged while its conflicts are unresolved or while its validation result belongs to an obsolete branch state.

### Pull request expectations

Every pull request must:

- target `main` unless an explicitly documented release or hotfix flow requires another base;
- use a Conventional Commit title;
- describe the purpose, change, evidence or provenance, trade-offs, and validation;
- link the issue or explain why no issue is required;
- state whether the pull request is ready for review;
- keep required checks and review conversations visible.

Use a draft pull request for incomplete work, unresolved design decisions, failing validation, or work that is not ready for external review. Mark it ready only after the author has completed the intended scope and recorded the remaining risks.

### Review and validation gates

The `Quality` check and `pnpm check` are required validation gates. The final pull request commit must pass them. A maintainer must approve the change or explicitly record a review waiver for a small, low-risk correction. AI agents cannot approve their own pull requests or waive review.

Knowledge, architecture, tooling, and workflow changes require review of correctness, scope, provenance, security, and maintenance cost. Review comments must be resolved before merge unless the maintainer explicitly records why a comment remains unresolved.

### Merge and cleanup

DKKB uses squash merging. The pull request title is the canonical squash-merge commit message. Merge commits and rebase-and-merge are not part of the normal workflow.

Only an authorized maintainer may merge a pull request. An AI agent may claim an issue, create or update a branch, make changes, run validation, open a pull request, and respond to review comments. An AI agent must not merge, enable auto-merge, approve its own pull request, or close the issue unless the active task explicitly authorizes that action.

After a squash merge, GitHub should delete the topic branch automatically. The closing reference should close the issue when the merge completes. If automatic cleanup or issue closure does not occur, the maintainer verifies and corrects it separately.

## Commit messages and pull request titles

DKKB uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages and pull request titles.

Use this form:

```text
type(scope): description
```

The scope is optional:

```text
type: description
```

The allowed types are:

- `feat`: add a user-visible capability or knowledge feature;
- `fix`: correct an existing behavior, document, link, or validation rule;
- `docs`: change documentation without changing behavior;
- `refactor`: restructure code or content without changing intended behavior;
- `test`: add or change tests;
- `build`: change build or package configuration;
- `ci`: change continuous integration or repository automation;
- `chore`: make maintenance changes that do not fit another type;
- `perf`: improve performance without changing intended behavior;
- `revert`: revert an earlier change.

Use a scope when it identifies a clear area of the change. Use a short lowercase identifier such as `content`, `site`, `docs`, `ci`, or `repo`. Omit the scope when the change affects the repository broadly or when a scope would add noise. Do not use an issue number as a scope.

Use a concise description after the colon. Do not end the description with a period. Keep the description meaningful without requiring the reader to open the issue.

Use `!` before the colon to mark a breaking change:

```text
feat!: replace the content metadata contract
feat(content)!: replace the content metadata contract
```

A commit can also use a `BREAKING CHANGE:` footer when its full message supports footers. A pull request title is one line, so use `!` when the title is the canonical squash-merge message.

Valid DKKB examples:

- `docs: document Conventional Commits`
- `ci: validate pull request titles`
- `fix(content): preserve glossary links`
- `feat(site): add topic navigation`
- `refactor!: replace the entry metadata contract`

Invalid DKKB examples:

- `Add commit rules` because it has no type;
- `documentation: add commit rules` because `documentation` is not an allowed type;
- `docs - add commit rules` because it does not use the required separator;
- `feat (site): add topic navigation` because it has a space before the scope;
- `fix: correct typo.` because the description ends with a period.

The repository uses squash merges. The pull request title is the canonical commit message for the squash merge, and the repository's squash-merge setting must use the pull request title as the default commit message. Individual commits should also follow this convention so branch history remains readable, but DKKB does not require separate commit-message metadata when the pull request title already supplies the canonical squash commit.

The `Conventional Commits` workflow validates pull request titles when a pull request is opened, edited, reopened, or synchronized. It validates the type and Conventional Commits structure. The workflow does not replace technical review or prove that the change is correctly classified.

## Dependencies

Do not add a dependency unless it provides a clear project requirement that cannot be met reasonably with the current toolchain or a small local script.

Do not add a backend, database, CMS, account system, hosted search service, or paid infrastructure as a core dependency without an explicit architecture decision.
