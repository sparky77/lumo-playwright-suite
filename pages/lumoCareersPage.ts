import type { Locator, Page } from '@playwright/test';

export class LumoCareersPage {
  readonly page: Page;

  readonly header: Locator;
  readonly sitePages: Locator;

  readonly heroHeading: Locator;

  readonly navHome: Locator;
  readonly navServices: Locator;
  readonly navInsights: Locator;
  readonly navCareers: Locator;
  readonly navContact: Locator;

  readonly sectionWhyLumo: Locator;
  readonly sectionWhatWeLookFor: Locator;
  readonly sectionOurCulture: Locator;
  readonly sectionOpportunities: Locator;

  readonly ctaGetInTouch: Locator;
  readonly ctaReadinessAudit: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = page.locator('#SITE_HEADER');
    this.sitePages = page.locator('#SITE_PAGES');

    this.heroHeading = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({
        hasText: /BUILD\s+THE\s+FUTURE\s+OF\s+WORK/i,
      })
      .first();

    this.navHome = this.header.getByRole('link', { name: /^Home$/i });
    this.navServices = this.header.getByRole('link', { name: /^Services$/i });
    this.navInsights = this.header.getByRole('link', { name: /^Insights$/i });
    this.navCareers = this.header.getByRole('link', { name: /^Careers$/i });
    this.navContact = this.header.getByRole('link', { name: /^Contact$/i });

    this.sectionWhyLumo = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({ hasText: /why\s+lumo\s*\?/i })
      .first();

    this.sectionWhatWeLookFor = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({ hasText: /what\s+we\s+look\s+for/i })
      .first();

    this.sectionOurCulture = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({ hasText: /our\s+culture/i })
      .first();

    this.sectionOpportunities = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({ hasText: /opportunities/i })
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
    await this.page.goto('https://www.lumochange.com/careers', { waitUntil: 'domcontentloaded' });
    await this.sitePages.waitFor({ state: 'visible' });
  }
}
