# External reference validation

External websites are not part of DKKB's deterministic pull-request boundary. Their availability, rate limits, bot policies, and redirects can change independently of repository correctness.

DKKB therefore checks external references on a schedule and on manual request, not inside `pnpm check`.

## Scope

`pnpm check:external-links` reads canonical Markdown under `src/content/docs/`. It checks URLs declared in `sources` frontmatter and authored HTTP/HTTPS Markdown links. Code examples are ignored.

The checker reports these classes explicitly:

- `ok`: an HTTP 2xx response;
- `redirect`: an HTTP 3xx response, including the reported location when present;
- `not-found`: HTTP 404 or 410;
- `access-restricted`: HTTP 401 or 403;
- `rate-limited`: HTTP 429;
- `server-error`: HTTP 5xx;
- `timeout` or `network-error`: no usable HTTP response;
- `client-error`: another HTTP 4xx response;
- `excluded`: a repository-configured narrow exclusion.

The checker uses GET requests with response bodies cancelled after headers arrive. Concurrency, timeout, retry count, retry delay, user agent, and exclusions are explicit in `config/external-links.json`.

## Persistence and failure policy

Retryable outcomes receive the configured conservative retry. A `not-found` or `server-error` result is considered confirmed only when the same classification persists across both attempts.

The scheduled workflow uses `--fail-on-confirmed`, so confirmed dead links and persistent server failures make the scheduled job red. Redirects, restricted access, rate limits, timeouts, and network failures remain visible in the report but do not by themselves prove that a source is invalid.

Normal pull-request CI never performs these network requests.

## Triage

For a reported problem:

1. Open the JSON workflow artifact and identify the canonical file and URL.
2. Recheck the source manually when the result can be transient or access-restricted.
3. Prefer an authoritative current location when a specification or documentation page moved.
4. Update the canonical source URL through a normal reviewed pull request.
5. Do not bypass authentication, bot protection, or rate limiting to make the checker green.

Do not automatically rewrite URLs from redirects. A redirect can be intentional, temporary, or unsuitable as a new canonical source.

## Exclusions

Keep `excludedHosts` and `excludedUrlPrefixes` empty unless repeated evidence shows that a source cannot be checked responsibly by automation. Every added exclusion must have a narrow scope and a documented reason in the change that introduces it.

The workflow runs every Monday at 04:17 UTC and also supports `workflow_dispatch`. It uses read-only repository permissions and SHA-pinned actions.
