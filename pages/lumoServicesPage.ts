import type { Locator, Page } from '@playwright/test';

export class LumoServicesPage {
  readonly page: Page;

  readonly header: Locator;
  readonly sitePages: Locator;

  readonly heroHeading: Locator;

  readonly navHome: Locator;
  readonly navServices: Locator;
  readonly navInsights: Locator;
  readonly navCareers: Locator;
  readonly navContact: Locator;

  readonly introText: Locator;

  readonly sectionDefine: Locator;
  readonly sectionEnable: Locator;
  readonly sectionChallenges: Locator;

  readonly ctaGetInTouch: Locator;
  readonly ctaReadinessAudit: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = page.locator('#SITE_HEADER');
    this.sitePages = page.locator('#SITE_PAGES');

    this.heroHeading = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({
        hasText:
          /WE\s+DEFINE\s+AND\s+DELIVER\s+THE\s+AI-?\s*ENABLED\s+FUTURE\s+OF\s+YOUR\s+BUSINESS/i,
      })
      .first();

    this.navHome = this.header.getByRole('link', { name: /^Home$/i });
    this.navServices = this.header.getByRole('link', { name: /^Services$/i });
    this.navInsights = this.header.getByRole('link', { name: /^Insights$/i });
    this.navCareers = this.header.getByRole('link', { name: /^Careers$/i });
    this.navContact = this.header.getByRole('link', { name: /^Contact$/i });

    this.introText = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({ hasText: /we help organisations move beyond pilots/i })
      .first();

    this.sectionDefine = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({ hasText: /advisory\s+&\s+education/i })
      .first();

    this.sectionEnable = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({ hasText: /organisational\s+enablement/i })
      .first();

    this.sectionChallenges = this.sitePages
      .locator('[data-testid="richTextElement"]')
      .filter({ hasText: /common\s+challenges\s+we\s+solve/i })
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
    await this.page.goto('https://www.lumochange.com/services', { waitUntil: 'domcontentloaded' });
    await this.sitePages.waitFor({ state: 'visible' });
  }
}
