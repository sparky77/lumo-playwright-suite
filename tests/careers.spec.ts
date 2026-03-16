import { test, expect } from '@playwright/test';
import { LumoCareersPage } from '../pages/lumoCareersPage';

test.describe('Lumo Change – Careers page', () => {
  test('Careers page loads and hero heading is visible', async ({ page }) => {
    test.setTimeout(60000);
    const careers = new LumoCareersPage(page);

    await careers.goto();

    const sitePages = page.locator('#SITE_PAGES');
    await expect(sitePages).toContainText(
      /BUILD\s+THE\s+FUTURE\s+OF\s+WORK/i,
      { timeout: 30000 }
    );
  });

  test('Primary navigation links are present (Home, Services, Insights, Careers, Contact)', async ({ page }) => {
    const careers = new LumoCareersPage(page);

    await careers.goto();

    await expect(careers.navHome).toBeVisible();
    await expect(careers.navServices).toBeVisible();
    await expect(careers.navInsights).toBeVisible();
    await expect(careers.navCareers).toBeVisible();
    await expect(careers.navContact).toBeVisible();
  });

  test('Careers page shows "why lumo?" section', async ({ page }) => {
    const careers = new LumoCareersPage(page);

    await careers.goto();

    await careers.sectionWhyLumo.scrollIntoViewIfNeeded();
    await expect(careers.sectionWhyLumo).toBeVisible();
  });

  test('Careers page shows "what we look for" section', async ({ page }) => {
    const careers = new LumoCareersPage(page);

    await careers.goto();

    await careers.sectionWhatWeLookFor.scrollIntoViewIfNeeded();
    await expect(careers.sectionWhatWeLookFor).toBeVisible();
  });

  test('Careers page shows "our culture" section', async ({ page }) => {
    const careers = new LumoCareersPage(page);

    await careers.goto();

    await careers.sectionOurCulture.scrollIntoViewIfNeeded();
    await expect(careers.sectionOurCulture).toBeVisible();
  });

  test('Careers page shows "opportunities" section', async ({ page }) => {
    const careers = new LumoCareersPage(page);

    await careers.goto();

    await careers.sectionOpportunities.scrollIntoViewIfNeeded();
    await expect(careers.sectionOpportunities).toBeVisible();
  });

  test('Careers page CTA buttons exist ("get in touch" and "readiness audit")', async ({ page }) => {
    const careers = new LumoCareersPage(page);

    await careers.goto();

    await careers.ctaGetInTouch.scrollIntoViewIfNeeded();
    await expect(careers.ctaGetInTouch).toBeVisible();

    await careers.ctaReadinessAudit.scrollIntoViewIfNeeded();
    await expect(careers.ctaReadinessAudit).toBeVisible();
  });
});
