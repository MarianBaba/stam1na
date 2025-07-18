import { Locator, Page } from 'playwright';
import BasePage from '../base/BasePage';
import { step } from '../../decorators/step';
import config from '../../config';

export default class HomePage extends BasePage {
  private readonly privacyConsentButton: Locator = this.page.locator(
    '[class="fc-button fc-cta-consent fc-primary-button"]'
  );

  @step()
  async acceptPrivacyIfVisible() {
    if (await this.privacyConsentButton.isVisible()) {
      await this.privacyConsentButton.click();
    }
  }

  @step()
  private async navigateToHomePage() {
    console.log("🟣" + config.url);
    await this.goto(config.url);
  }

  @step()
  public static async openInNewTab(page: Page): Promise<HomePage> {
    const newPage = await BasePage.openEmptyPage(page);
    const homePage = new this(newPage);
    await homePage.navigateToHomePage();
    return homePage;
  }
}