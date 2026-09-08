import { describe, expect, it } from 'vitest';
import path from 'node:path';
import process from 'node:process';
import { rewriteContentLink } from './remark-content-links.mjs';

const docsRoot = path.join(process.cwd(), 'src', 'content', 'docs');
const source = path.join(docsRoot, 'llm', 'context-engineering.md');

describe('rewriteContentLink', () => {
  it('rewrites a source-relative Markdown file link to the configured site route', () => {
    expect(
      rewriteContentLink('../glossary/large-language-model.md', source, '/dkkb/')
    ).toBe('/dkkb/glossary/large-language-model/');
  });

  it('preserves query strings and fragments', () => {
    expect(
      rewriteContentLink('../glossary/large-language-model.md?view=full#usage', source, 'dkkb')
    ).toBe('/dkkb/glossary/large-language-model/?view=full#usage');
  });

  it('leaves external, absolute, anchor, and non-Markdown links unchanged', () => {
    for (const link of [
      'https://example.com/reference.md',
      '/dkkb/glossary/large-language-model/',
      '#section',
      '../glossary/large-language-model/',
    ]) {
      expect(rewriteContentLink(link, source, '/dkkb/')).toBe(link);
    }
  });

  it('does not rewrite a Markdown path that escapes canonical content', () => {
    expect(rewriteContentLink('../../../../README.md', source, '/dkkb/')).toBe('../../../../README.md');
  });
});
