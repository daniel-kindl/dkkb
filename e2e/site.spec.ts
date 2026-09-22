import { expect, test, type Page } from '@playwright/test';

async function openSearch(page: Page) {
  const searchButton = page.getByRole('button', { name: /search/i }).first();
  await searchButton.click();
  return page.getByRole('searchbox').or(page.locator('dialog input, [data-pagefind-ui] input')).first();
}

test.describe('DKKB browser smoke', () => {
  test('renders the homepage and sidebar navigation', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/DKKB/);
    await expect(page.getByRole('navigation').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /principles/i }).first()).toBeVisible();
  });

  test('opens search and finds a knowledge entry', async ({ page }) => {
    await page.goto('./');
    const box = await openSearch(page);
    await expect(box).toBeVisible();
    await box.fill('strategy');
    const result = page.getByRole('link', { name: /strategy/i }).first();
    await expect(result).toBeVisible();
  });

  test('filters glossary terms', async ({ page }) => {
    await page.goto('./glossary/');
    await expect(page.getByRole('heading', { name: /glossary/i }).first()).toBeVisible();
    const filter = page.getByLabel(/filter vocabulary/i);
    await expect(filter).toBeVisible();
    await filter.fill('zzzz-no-such-term');
    await expect(page.getByText(/no matching glossary terms/i)).toBeVisible();
    await filter.fill('');
    await expect(page.locator('[data-glossary-item]:not([hidden])').first()).toBeVisible();
  });

  test('loads the knowledge graph neighborhood', async ({ page }) => {
    await page.goto('./references/knowledge-graph/');
    await expect(page.getByRole('heading', { name: /knowledge graph/i }).first()).toBeVisible();
    await expect(page.locator('[data-graph-summary]')).not.toHaveText('');
    await expect(page.locator('[data-graph-svg] .graph-node').first()).toBeVisible();
  });

  test('renders a Mermaid diagram', async ({ page }) => {
    await page.goto('./patterns/strategy/');
    await expect(page.locator('.mermaid svg, pre.mermaid svg, svg[id^="mermaid"]').first()).toBeVisible();
  });

  test('toggles theme without losing content', async ({ page }) => {
    await page.goto('./');
    const theme = page.getByRole('button', { name: /theme|light|dark/i }).first();
    await expect(theme).toBeVisible();
    await theme.click();
    const option = page.getByRole('menuitem', { name: /dark/i })
      .or(page.getByRole('option', { name: /dark/i }))
      .or(page.getByText(/^dark$/i));
    if (await option.first().isVisible().catch(() => false)) {
      await option.first().click();
    }
    await expect(page.getByRole('navigation').first()).toBeVisible();
  });

  test('opens mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('./');
    const menu = page.getByRole('button', { name: /menu/i }).first();
    await expect(menu).toBeVisible();
    await menu.click();
    await expect(page.getByRole('link', { name: /principles/i }).first()).toBeVisible();
  });

  test('navigates internally and shows a 404 page', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('link', { name: /principles/i }).first().click();
    await expect(page).toHaveURL(/\/principles\/?$/);
    await expect(page.getByRole('heading', { name: /principles/i }).first()).toBeVisible();

    const missing = await page.goto('./this-route-does-not-exist/');
    expect(missing?.status()).toBe(404);
    await expect(page.getByRole('heading').first()).toBeVisible();
  });
});
