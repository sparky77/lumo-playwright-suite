import type { Locator, Page } from '@playwright/test';

export class LumoContactPage {
  readonly page: Page;

  readonly header: Locator;
  readonly sitePages: Locator;

  readonly heroHeading: Locator;

  readonly navHome: Locator;
  readonly navServices: Locator;
  readonly navInsights: Locator;
  readonly navCareers: Locator;
  readonly navContact: Locator;

  readonly letsChatHeading: Locator;
  readonly emailLink: Locator;

  readonly formFirstName: Locator;
  readonly formLastName: Locator;
  readonly formEmail: Locator;
  readonly formMessage: Locator;
  readonly formSendButton: Locator;

  readonly faqSection: Locator;

  readonly ctaGetInTouch: Locator;
  readonly ctaReadinessAudit: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = page.locator('#SITE_HEADER');
    this.sitePages = page.locator('#SITE_PAGES');

    this.heroHeading = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({
        hasText: /CONTACT\s+US\s+-\s+GET\s+IN\s+TOUCH/i,
      })
      .first();

    this.navHome = this.header.getByRole('link', { name: /^Home$/i });
    this.navServices = this.header.getByRole('link', { name: /^Services$/i });
    this.navInsights = this.header.getByRole('link', { name: /^Insights$/i });
    this.navCareers = this.header.getByRole('link', { name: /^Careers$/i });
    this.navContact = this.header.getByRole('link', { name: /^Contact$/i });

    this.letsChatHeading = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({ hasText: /let.s\s+chat/i })
      .first();

    this.emailLink = this.sitePages
      .getByRole('link', { name: /info@lumochange\.com/i });

    this.formFirstName = this.sitePages.getByLabel(/first\s+name/i);
    this.formLastName = this.sitePages.getByLabel(/last\s+name/i);
    this.formEmail = this.sitePages.getByLabel(/^email/i);
    this.formMessage = this.sitePages.getByLabel(/message/i);
    this.formSendButton = this.sitePages.getByRole('button', { name: /send/i });

    this.faqSection = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({ hasText: /faq/i })
      .first();

    this.ctaGetInTouch = page
      .getByRole('link', { name: /get in touch/i })
      .or(page.getByRole('button', { name: /get in touch/i }))
      .first();
    this.ctaReadinessAudit = page
      .getByRole('link', { name: /readiness audit/i })
      .or(page.getByRole('button', { name: /readiness audit/i }))
      .first();
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.lumochange.com/contact', { waitUntil: 'domcontentloaded' });
    await this.sitePages.waitFor({ state: 'visible' });
  }
}
