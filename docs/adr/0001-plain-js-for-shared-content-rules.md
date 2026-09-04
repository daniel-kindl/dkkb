# Shared content-domain modules stay plain JS, not TypeScript

`scripts/validate-content.mjs` runs under plain `node` with no build step. Node only strips TypeScript types unflagged starting at 22.18.0; this repo pins `22.13.1` in `.nvmrc` and CI. A `.ts` module is therefore not importable from the validation scripts today without an engines bump or an experimental flag.

We decided that any module shared between the validation scripts and the Astro/Vite-built site (starting with the homepage-eligibility rule) is authored as plain `.mjs` with JSDoc types, not `.ts`, even though `tsconfig.json` exists and other `src/lib/` modules are TypeScript. This avoids bumping the pinned Node version or running scripts with `--experimental-strip-types` for a decision unrelated to the Node upgrade itself.

## Considered options

- Bump `.nvmrc`, `package.json` engines, and both CI workflows to Node `>=22.18.0`, keeping the shared module as `.ts`. Rejected: couples an unrelated ticket to a Node version bump.
- Run the validation scripts with `--experimental-strip-types`. Rejected: adds an experimental flag to CI/local tooling for no gain over plain JS.
