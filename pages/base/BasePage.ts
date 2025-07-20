import { Locator, Page } from 'playwright';
import env from '../../utils/env';
import { step } from '../../decorators/step';
import { isValidUrl } from '../../utils/url';

export default abstract class BasePage {
  protected static readonly viewportSize = {
    width: +env.VIEWPORT_WIDTH,
    height: +env.VIEWPORT_HEIGHT,
  };
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get privacyConsentButton(): Locator {
    return this.page.locator('[class="fc-button fc-cta-consent fc-primary-button"]');
  }

  @step()
  async acceptPrivacyIfVisible(): Promise<void> {
    const button = this.page.locator('[class="fc-button fc-cta-consent fc-primary-button"]');
    await button.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    if (await button.isVisible()) {
      await button.click();
    }
  }

  @step()
  async goto(url: string): Promise<void> {
    if (!isValidUrl(url)) {
      throw new Error('invalid url');
    }
    this.acceptPrivacyIfVisible();
    await this.page.goto(url);
  }

  async scrollToElement(element: string | Locator): Promise<void> {
    const locator = typeof element === 'string' ? this.page.locator(element) : element;
    await locator.scrollIntoViewIfNeeded();
  }

  @step()
  protected static async openEmptyPage(page: Page): Promise<Page> {
    const newPage = await page.context().newPage();
    await newPage.setViewportSize(this.viewportSize);
    return newPage;
  }
}
