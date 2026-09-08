# Changelog

All notable changes to DKKB will be documented in this file.

## [0.4.1](https://github.com/daniel-kindl/dkkb/compare/v0.4.0...v0.4.1) (2026-09-08)


### Bug Fixes

* **accessibility:** audit custom site surfaces ([#191](https://github.com/daniel-kindl/dkkb/issues/191)) ([c1f214d](https://github.com/daniel-kindl/dkkb/commit/c1f214d2b6c5b5a070179be80044f88cfddc5613))

## [0.4.0](https://github.com/daniel-kindl/dkkb/compare/v0.3.0...v0.4.0) (2026-09-08)


### Features

* **ai:** publish machine-friendly knowledge index ([#185](https://github.com/daniel-kindl/dkkb/issues/185)) ([08dab8b](https://github.com/daniel-kindl/dkkb/commit/08dab8b27effa94d9645ff5312f3e775d24f1a86))
* **knowledge-graph:** add relationship explorer ([#177](https://github.com/daniel-kindl/dkkb/issues/177)) ([2074418](https://github.com/daniel-kindl/dkkb/commit/2074418561009521b98c903abc39420763e2ec83))
* **search:** index canonical metadata ([#183](https://github.com/daniel-kindl/dkkb/issues/183)) ([6124d2b](https://github.com/daniel-kindl/dkkb/commit/6124d2bd1cf4d238b0d104213e0fbde75ed327ff))


### Bug Fixes

* **release:** prevent generated changelog lint failures ([#182](https://github.com/daniel-kindl/dkkb/issues/182)) ([206284f](https://github.com/daniel-kindl/dkkb/commit/206284f390516b3275974b3370c06c482dadee8b))

## [0.3.0](https://github.com/daniel-kindl/dkkb/compare/v0.2.0...v0.3.0) (2026-09-08)

### Features

* **glossary:** add vocabulary browser and backlinks ([#147](https://github.com/daniel-kindl/dkkb/issues/147)) ([e92470d](https://github.com/daniel-kindl/dkkb/commit/e92470d07bd9161633a8a96943abe930dbf578e1))
* **glossary:** define glossary aliases and linking policy ([#141](https://github.com/daniel-kindl/dkkb/issues/141)) ([7875fa0](https://github.com/daniel-kindl/dkkb/commit/7875fa00d14e1a6289c629339a044b4c3fbcb78b))

### Bug Fixes

* **ci:** deploy Pages independently of releases ([#134](https://github.com/daniel-kindl/dkkb/issues/134)) ([e20d1ab](https://github.com/daniel-kindl/dkkb/commit/e20d1ab9b5f699ff9058b44bcc95c354b8790176))

## [0.2.0](https://github.com/daniel-kindl/dkkb/compare/v0.1.0...v0.2.0) (2026-09-07)

### Features

* **docs:** adopt Mermaid diagrams ([#12](https://github.com/daniel-kindl/dkkb/issues/12)) ([4c7fee3](https://github.com/daniel-kindl/dkkb/commit/4c7fee3a1b0a9e75aa392c35d72d3b28dec45ca3))
* **lib:** add homepage-eligibility module ([#85](https://github.com/daniel-kindl/dkkb/issues/85)) ([#88](https://github.com/daniel-kindl/dkkb/issues/88)) ([c2826a4](https://github.com/daniel-kindl/dkkb/commit/c2826a44fa0e9fecbd02e3bb6b4f5301e5fe01fd))
* **lib:** extract entry-selection module from MarkdownContent.astro ([#86](https://github.com/daniel-kindl/dkkb/issues/86)) ([#90](https://github.com/daniel-kindl/dkkb/issues/90)) ([b60e98e](https://github.com/daniel-kindl/dkkb/commit/b60e98e68c7b464a7b49c8b69c8080649cbfcc05))
* **site:** derive homepage content from canonical metadata ([#38](https://github.com/daniel-kindl/dkkb/issues/38)) ([cdd8e3c](https://github.com/daniel-kindl/dkkb/commit/cdd8e3c837c9361e95e2e9cf7b9fd9093f752c4f))
* **site:** derive navigation from frontmatter and validate built links ([#29](https://github.com/daniel-kindl/dkkb/issues/29)) ([c74e88e](https://github.com/daniel-kindl/dkkb/commit/c74e88e9a645506a39ccb010895d84edd53e069d))
* **site:** improve knowledge entry presentation ([#25](https://github.com/daniel-kindl/dkkb/issues/25)) ([4e2b59b](https://github.com/daniel-kindl/dkkb/commit/4e2b59bbfed75a20f59fb56c4267b9ecd130f50b))
* **site:** redesign DKKB homepage ([#28](https://github.com/daniel-kindl/dkkb/issues/28)) ([24c2330](https://github.com/daniel-kindl/dkkb/commit/24c23300d59642b6f3a686ebab154e473c0894b6))

### Bug Fixes

* align Markdown lint with Starlight frontmatter ([03f4e46](https://github.com/daniel-kindl/dkkb/commit/03f4e465471fb734c6612ffaf9fcd32f47a2d552))
* align Node runtime with pnpm requirement ([99e4107](https://github.com/daniel-kindl/dkkb/commit/99e4107b9d0a10a48e0d577dec3ba221bfef6f53))
* align package Node engine with pnpm ([ad1ede3](https://github.com/daniel-kindl/dkkb/commit/ad1ede3f2e9f5c634efdcfc138a2daea79a72262))
* apply Mermaid htmlLabels at root config ([#42](https://github.com/daniel-kindl/dkkb/issues/42)) ([916def9](https://github.com/daniel-kindl/dkkb/commit/916def9734ba36f1cbd0043b5059e02046592f88))
* avoid Corepack pnpm trust-key failure ([ce008ee](https://github.com/daniel-kindl/dkkb/commit/ce008eea1cc1886207ae2dbff5e59b18a1ead004))
* avoid Corepack pnpm trust-key failure in Pages ([166af7a](https://github.com/daniel-kindl/dkkb/commit/166af7a8f8c3c8ce5340ec2ad31b2fdd0d030920))
* **ci:** keep release workflow green without PAT ([#128](https://github.com/daniel-kindl/dkkb/issues/128)) ([3e830d5](https://github.com/daniel-kindl/dkkb/commit/3e830d5c27c01f50812e9fd4059a174fc9ea1b10))
* keep reviewed dates as strings ([da8f608](https://github.com/daniel-kindl/dkkb/commit/da8f608e5838886409112123186f34a855cf699c))
* refit Mermaid flowchart viewBoxes after render ([#43](https://github.com/daniel-kindl/dkkb/issues/43)) ([6eb49f5](https://github.com/daniel-kindl/dkkb/commit/6eb49f5ae56a07560474698cbc9f6effbfa980d6))
* **site:** narrow desktop table of contents ([#22](https://github.com/daniel-kindl/dkkb/issues/22)) ([3742f77](https://github.com/daniel-kindl/dkkb/commit/3742f7745d9368d08c61e7632435d934a36fe5bb))
* **site:** remove duplicate titles and rebalance layout ([#20](https://github.com/daniel-kindl/dkkb/issues/20)) ([9bb583a](https://github.com/daniel-kindl/dkkb/commit/9bb583ade70a19c734d90a0615c2726f84cedae8))
* **site:** simplify category navigation ([#27](https://github.com/daniel-kindl/dkkb/issues/27)) ([6ee6de6](https://github.com/daniel-kindl/dkkb/commit/6ee6de6feb2a08ec5834492e2b7be2af8b126f76))
* stabilize Mermaid flowchart labels ([#41](https://github.com/daniel-kindl/dkkb/issues/41)) ([b63e0ba](https://github.com/daniel-kindl/dkkb/commit/b63e0ba1f0154cf699861705aec7b41535d58137))
* update Starlight configuration syntax ([0d7ad82](https://github.com/daniel-kindl/dkkb/commit/0d7ad822323b2a26d5eab99356f0ba703457c139))
* use a pnpm-compatible Node runtime for Pages ([d2735ff](https://github.com/daniel-kindl/dkkb/commit/d2735ff5f839add5179815671fc7e695b9a82a9b))
* use a pnpm-compatible Node runtime in CI ([0271bd2](https://github.com/daniel-kindl/dkkb/commit/0271bd26ff7b507968f97314c0a69ebb7053065e))

## [Unreleased]

Release Please will populate the next version from accepted Conventional Commit history.
