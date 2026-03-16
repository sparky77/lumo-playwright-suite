import { test, expect } from '@playwright/test';
import { LumoServicesPage } from '../pages/lumoServicesPage';

test.describe('Lumo Change – Services page', () => {
  test('Services page loads and hero heading is visible', async ({ page }) => {
    test.setTimeout(60000);
    const services = new LumoServicesPage(page);

    await services.goto();

    const sitePages = page.locator('#SITE_PAGES');
    await expect(sitePages).toContainText(
      /WE\s+DEFINE\s+AND\s+DELIVER\s+THE\s+AI-?\s*ENABLED\s+FUTURE\s+OF\s+YOUR\s+BUSINESS/i,
      { timeout: 30000 }
    );
  });

  test('Primary navigation links are present (Home, Services, Insights, Careers, Contact)', async ({ page }) => {
    const services = new LumoServicesPage(page);

    await services.goto();

    await expect(services.navHome).toBeVisible();
    await expect(services.navServices).toBeVisible();
    await expect(services.navInsights).toBeVisible();
    await expect(services.navCareers).toBeVisible();
    await expect(services.navContact).toBeVisible();
  });

  test('Services intro text mentions helping organisations move beyond pilots', async ({ page }) => {
    const services = new LumoServicesPage(page);

    await services.goto();

    await services.introText.scrollIntoViewIfNeeded();
    await expect(services.introText).toBeVisible();
  });

  test('Services page shows "advisory & education" (define) section', async ({ page }) => {
    const services = new LumoServicesPage(page);

    await services.goto();

    await services.sectionDefine.scrollIntoViewIfNeeded();
    await expect(services.sectionDefine).toBeVisible();
  });

  test('Services page shows "organisational enablement" (enable) section', async ({ page }) => {
    const services = new LumoServicesPage(page);

    await services.goto();

    await services.sectionEnable.scrollIntoViewIfNeeded();
    await expect(services.sectionEnable).toBeVisible();
  });

  test('Services page shows "common challenges we solve" section', async ({ page }) => {
    const services = new LumoServicesPage(page);

    await services.goto();

    await services.sectionChallenges.scrollIntoViewIfNeeded();
    await expect(services.sectionChallenges).toBeVisible();
  });

  test('Services page CTA buttons exist ("get in touch" and "readiness audit")', async ({ page }) => {
    const services = new LumoServicesPage(page);

    await services.goto();

    await services.ctaGetInTouch.scrollIntoViewIfNeeded();
    await expect(services.ctaGetInTouch).toBeVisible();

    await services.ctaReadinessAudit.scrollIntoViewIfNeeded();
    await expect(services.ctaReadinessAudit).toBeVisible();
  });
});
