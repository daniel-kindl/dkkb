import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

const config = JSON.parse(fs.readFileSync('.markdownlint-cli2.jsonc', 'utf8'));
const fixturePath = 'test/fixtures/release-please/CHANGELOG.md';

describe('Release Please changelog lint regression', () => {
  it('keeps MD012 enabled for authored Markdown by default', () => {
    expect(config.config.MD012).not.toBe(false);
    expect(config.config.default).toBe(true);
  });

  it('disables MD012 only for the generated changelog and its regression fixture', () => {
    const override = config.overrides.find((item) => item.config?.MD012 === false);

    expect(override).toEqual({
      filter: ['CHANGELOG.md', fixturePath],
      config: { MD012: false },
      combine: 'merge',
    });
  });

  it('keeps the issue 135 multiple-blank pattern in the fixture', () => {
    const fixture = fs.readFileSync(fixturePath, 'utf8');
    expect(fixture).toContain('### Features\n\n\n-');
    expect(fixture).toContain('### Bug Fixes\n\n\n-');
  });
});
