import type { Locator, Page } from '@playwright/test';

export class LumoHomePage {
  readonly page: Page;

  readonly header: Locator;
  readonly sitePages: Locator;

  readonly heroHeading: Locator;

  readonly navHome: Locator;
  readonly navServices: Locator;
  readonly navInsights: Locator;
  readonly navCareers: Locator;
  readonly navContact: Locator;

  readonly ctaGetInTouch: Locator;
  readonly ctaReadinessAudit: Locator;

  readonly stat20Plus: Locator;
  readonly stat1000s: Locator;
  readonly stat100s: Locator;
  readonly stat50Plus: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = page.locator('#SITE_HEADER');
    this.sitePages = page.locator('#SITE_PAGES');

    this.heroHeading = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({
        hasText:
          /(WE\s+BRING\s+THE\s+REALITY\s+BACK\s+TO\s+AI)|(BUILD\s+THE\s+CONDITIONS\s+FOR\s+AI\s+TO\s+SCALE)/i,
      })
      .first();

    this.navHome = this.header.getByRole('link', { name: /^Home$/i });
    this.navServices = this.header.getByRole('link', { name: /^Services$/i });
    this.navInsights = this.header.getByRole('link', { name: /^Insights$/i });
    this.navCareers = this.header.getByRole('link', { name: /^Careers$/i });
    this.navContact = this.header.getByRole('link', { name: /^Contact$/i });

    this.ctaGetInTouch = this.sitePages
      .getByRole('link', { name: /get in touch/i })
      .or(this.sitePages.getByRole('button', { name: /get in touch/i }))
      .first();
    this.ctaReadinessAudit = this.sitePages
      .getByRole('link', { name: /readiness audit/i })
      .or(this.sitePages.getByRole('button', { name: /readiness audit/i }))
      .first();

    this.stat20Plus = this.sitePages.getByText(/20\s*\+/).first();
    this.stat1000s = this.sitePages.getByText(/(1000\s*s)|(1\s*,\s*000\s*s)|(1000\s*\+)|(1\s*,\s*000\s*\+)/i).first();
    this.stat100s = this.sitePages.getByText(/(100\s*s)|(100\s*\+)/i).first();
    this.stat50Plus = this.sitePages.getByText(/50\s*\+/).first();
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.lumochange.com/', { waitUntil: 'domcontentloaded' });
    await this.sitePages.waitFor({ state: 'visible' });
  }
}
