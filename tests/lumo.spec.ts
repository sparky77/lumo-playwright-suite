import { test, expect } from '@playwright/test';
import { LumoHomePage } from '../pages/lumoHomePage';

test.describe('Lumo Change (Wix) public site', () => {
  test('Homepage loads and hero heading contains "WE BRING THE REALITY BACK TO AI"', async ({ page }) => {
    test.setTimeout(60000);
    const home = new LumoHomePage(page);

    await home.goto();

    const sitePages = page.locator('#SITE_PAGES');
    await expect(sitePages).toContainText(
      /(WE\s+BRING\s+THE\s+REALITY\s+BACK\s+TO\s+AI)|(BUILD\s+THE\s+CONDITIONS\s+FOR\s+AI\s+TO\s+SCALE)/i,
      { timeout: 30000 }
    );
  });

  test('Primary navigation links are present (Home, Services, Insights, Careers, Contact)', async ({ page }) => {
    const home = new LumoHomePage(page);

    await home.goto();

    await expect(home.navHome).toBeVisible();
    await expect(home.navServices).toBeVisible();
    await expect(home.navInsights).toBeVisible();
    await expect(home.navCareers).toBeVisible();
    await expect(home.navContact).toBeVisible();
  });

  test('Homepage CTA buttons exist ("get in touch" and "readiness audit")', async ({ page }) => {
    const home = new LumoHomePage(page);

    await home.goto();

    await home.ctaGetInTouch.scrollIntoViewIfNeeded();
    await expect(home.ctaGetInTouch).toBeVisible();

    await home.ctaReadinessAudit.scrollIntoViewIfNeeded();
    await expect(home.ctaReadinessAudit).toBeVisible();
  });

  test('Homepage stats section shows 20+, 1000s, 100s, 50+', async ({ page }) => {
    const home = new LumoHomePage(page);

    await home.goto();

    await home.stat20Plus.scrollIntoViewIfNeeded();
    await expect(home.stat20Plus).toBeVisible();
    await expect(home.stat1000s).toBeVisible();
    await expect(home.stat100s).toBeVisible();
    await expect(home.stat50Plus).toBeVisible();
  });

  test('Contact page loads successfully at /contact', async ({ page }) => {
    const response = await page.goto('https://www.lumochange.com/contact');

    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveURL(/\/contact\/?$/);
    await expect(page).toHaveTitle(/contact/i);
  });
});
