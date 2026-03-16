import { test, expect } from '@playwright/test';
import { LumoContactPage } from '../pages/lumoContactPage';

test.describe('Lumo Change – Contact page', () => {
  test('Contact page loads and hero heading is visible', async ({ page }) => {
    test.setTimeout(60000);
    const contact = new LumoContactPage(page);

    await contact.goto();

    const sitePages = page.locator('#SITE_PAGES');
    await expect(sitePages).toContainText(
      /CONTACT\s+US\s+-\s+GET\s+IN\s+TOUCH/i,
      { timeout: 30000 }
    );
  });

  test('Primary navigation links are present (Home, Services, Insights, Careers, Contact)', async ({ page }) => {
    const contact = new LumoContactPage(page);

    await contact.goto();

    await expect(contact.navHome).toBeVisible();
    await expect(contact.navServices).toBeVisible();
    await expect(contact.navInsights).toBeVisible();
    await expect(contact.navCareers).toBeVisible();
    await expect(contact.navContact).toBeVisible();
  });

  test('Contact page shows "let\'s chat" section with email link', async ({ page }) => {
    const contact = new LumoContactPage(page);

    await contact.goto();

    await contact.letsChatHeading.scrollIntoViewIfNeeded();
    await expect(contact.letsChatHeading).toBeVisible();

    await expect(contact.emailLink).toBeVisible();
  });

  test('Contact form fields are present (First Name, Last Name, Email, Message, Send)', async ({ page }) => {
    const contact = new LumoContactPage(page);

    await contact.goto();

    await contact.formFirstName.scrollIntoViewIfNeeded();
    await expect(contact.formFirstName).toBeVisible();
    await expect(contact.formLastName).toBeVisible();
    await expect(contact.formEmail).toBeVisible();
    await expect(contact.formMessage).toBeVisible();
    await expect(contact.formSendButton).toBeVisible();
  });

  test('Contact page shows FAQ section', async ({ page }) => {
    const contact = new LumoContactPage(page);

    await contact.goto();

    await contact.faqSection.scrollIntoViewIfNeeded();
    await expect(contact.faqSection).toBeVisible();
  });

  test('Contact page CTA buttons exist ("get in touch" and "readiness audit")', async ({ page }) => {
    const contact = new LumoContactPage(page);

    await contact.goto();

    await contact.ctaGetInTouch.scrollIntoViewIfNeeded();
    await expect(contact.ctaGetInTouch).toBeVisible();

    await contact.ctaReadinessAudit.scrollIntoViewIfNeeded();
    await expect(contact.ctaReadinessAudit).toBeVisible();
  });
});
