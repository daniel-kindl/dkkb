# Markdown presentation conventions

## Purpose

DKKB uses a small presentation toolkit to improve readability without making the generated website authoritative.

Canonical knowledge remains Markdown. Presentation features must keep the source readable in GitHub, editors, generic Markdown tooling, and future exports.

## Principles

- Prefer common Markdown when it expresses the content clearly.
- Add presentation only when it improves understanding or navigation.
- Keep essential meaning in prose or other portable Markdown.
- Do not make a reader depend on color, icons, animation, or site-specific layout.
- Do not add MDX or component imports to canonical knowledge.

Starlight Markdown asides are the only approved Starlight-specific authoring syntax in canonical entries. They are allowed because the source remains plain text and the content stays readable without the visual treatment.

Mermaid diagram rules are defined separately in [diagram conventions](DIAGRAMS.md).

## Asides

Use Starlight Markdown asides for short secondary information.

```md
:::tip[Prefer the smaller abstraction]
A function can implement Strategy when a dedicated class adds no useful state or contract.
:::
```

Use aside types consistently:

- `note`: supplementary context that is useful but not part of the main argument;
- `tip`: practical guidance that can make an implementation or decision easier;
- `caution`: an important trade-off, common misuse, or condition that can cause a recoverable problem;
- `danger`: a serious security, privacy, data-loss, or correctness risk.

Use a custom title when it makes the purpose clearer. Do not add custom aside icons to canonical entries.

Do not hide a required step, primary recommendation, critical definition, or essential constraint only inside an aside.

Do not use asides only to make a page look more varied.

## Code

Use fenced Markdown code blocks for source code, shell commands, configuration, queries, and other literal technical content.

Always set the language when it is known and supported.

````md
```ts title="strategy.ts" {2-4}
interface Strategy {
  execute(input: Input): Result;
}
```
````

Starlight uses Expressive Code for Markdown code blocks. Its Markdown metadata can be used when it adds meaning:

- add a title when a file name, terminal context, or source identity matters;
- highlight lines or text when the surrounding explanation refers to that focus;
- use inserted or deleted markers when showing a change is clearer than two separate examples.

Keep the raw Markdown understandable without the enhanced rendering.

Do not use Starlight's MDX-only `<Code>` component in canonical entries.

## File trees

Represent directory structures with a fenced `text` block.

```text
src/
├── domain/
│   ├── game.ts
│   └── offer.ts
├── application/
│   └── compare-prices.ts
└── infrastructure/
    └── steam-client.ts
```

Keep file trees focused on the structure that supports the explanation. Do not reproduce a large repository tree when only a few paths matter.

Do not use the MDX-only `<FileTree>` component in canonical entries.

## Procedures

Use a normal Markdown ordered list for sequential procedures.

1. Create the new schema.
2. Start dual writes.
3. Backfill existing records.
4. Verify parity.
5. Switch reads.
6. Remove the legacy path.

Use an ordered list only when order matters. Use bullets when the items are independent.

Do not use the MDX-only `<Steps>` component in canonical entries.

## Icons

Do not use Starlight's `<Icon>` component in canonical entries.

Icons can be used by the generated site's navigation or presentation layer, but canonical knowledge must not depend on them. An icon must not be the only signal for meaning or severity.

## Blockquotes

Use Markdown blockquotes for quoted material or for text that is explicitly presented as a quotation.

Do not use blockquotes as generic callouts. Use an aside when secondary guidance needs callout treatment.

Follow the source policy when quoting protected material.

## Portability

A canonical entry must remain useful when Starlight-specific styling is unavailable.

The approved aside syntax is a narrow portability exception. The markers may appear as plain text in renderers that do not understand them, but the contained information must still make sense.

If the site generator changes, presentation syntax must be removable or transformable without rewriting the underlying knowledge.

## References

- [Starlight: Authoring Content in Markdown](https://starlight.astro.build/guides/authoring-content/)
- [Starlight: Asides](https://starlight.astro.build/components/asides/)
- [Starlight: Code](https://starlight.astro.build/components/code/)
- [Starlight: File Tree](https://starlight.astro.build/components/file-tree/)
- [Starlight: Icons](https://starlight.astro.build/components/icons/)
- [Starlight: Steps](https://starlight.astro.build/components/steps/)
