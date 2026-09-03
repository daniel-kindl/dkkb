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

## Page titles

Every canonical entry must contain exactly one level-one Markdown heading. Its text must match the frontmatter `title` exactly.

Keep the Markdown H1 in the canonical file. It makes the entry readable when the file is viewed directly on GitHub or in another Markdown renderer.

Starlight also renders the frontmatter title by default. DKKB overrides Starlight's `PageTitle` presentation so that the generated website does not display a duplicate visible H1. The override preserves Starlight's `_top` anchor for page overview and skip navigation.

Do not remove the canonical Markdown H1 to work around website presentation behavior.

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
```ts title="strategy.ts" {3-5}
interface Strategy
{
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

### Code style

DKKB-authored examples in curly-brace languages use Allman brace placement for code blocks.

Put the opening brace of a block on its own line. Align it with the declaration, control statement, or other construct that owns the block. Put the closing brace on its own line at the same indentation level as that construct.

Indent each nested block by 4 spaces. Use spaces, not tab characters, for indentation.

```c
if (condition)
{
    execute();
}
else
{
    recover();
}
```

Keep a function or method signature on one line when it remains reasonably readable. Do not split a short signature only because the function body uses Allman braces.

```ts
function compress(data: Uint8Array, strategy: CompressionStrategy): Uint8Array
{
    return strategy(data);
}
```

Wrap parameters only when the signature becomes too long or multiline formatting materially improves clarity. When a signature is wrapped, put one parameter on each line and use 4-space continuation indentation. Do not add a trailing comma to a single-line parameter list.

Apply the Allman rule to block braces. Do not force Allman placement onto braces that represent data, such as JavaScript or TypeScript object literals, when doing so would reduce clarity.

This rule applies to original examples written for DKKB. Preserve the meaningful original form of quoted, externally sourced, generated, or tool-output code when reformatting would reduce fidelity.

Language correctness and semantic clarity take precedence over presentation. Languages that use indentation or another syntax to define blocks keep their normal structure.

Code-style enforcement is a review responsibility for now. Do not add a language-aware code-fence formatter or linter only to enforce this rule unless repository usage later justifies that maintenance cost.

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

## Site layout

DKKB uses Starlight custom CSS for small presentation adjustments. Prefer documented Starlight custom properties over selectors that depend on internal component markup.

The generated site uses a `54rem` content width on wide viewports. This gives technical content, code, and diagrams more room than Starlight's default content width.

The desktop table-of-contents column uses a dedicated `16rem` width. DKKB implements this through Starlight's supported `TwoColumnContent` component override because Starlight otherwise derives the right column width from the same sidebar width used by the left navigation.

The override preserves Starlight's existing desktop breakpoint, fixed table-of-contents behavior, scrolling, border, and main-content alignment. It changes only the width calculation for the right column. The left navigation keeps Starlight's normal width.

Review `src/components/TwoColumnContent.astro` against Starlight's upstream component when Starlight is upgraded. Keep the override only while Starlight does not expose a separate supported table-of-contents width setting.

Responsive and mobile layout behavior remains owned by Starlight.

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
- [Starlight: CSS and Styling](https://starlight.astro.build/guides/css-and-tailwind/)
- [Starlight: Overriding Components](https://starlight.astro.build/guides/overriding-components/)
- [Indentation style: Allman style](https://en.wikipedia.org/wiki/Indentation_style#Allman_style)
