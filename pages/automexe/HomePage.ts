import { Page } from 'playwright';
import BasePage from '../base/BasePage';
import { step } from '../../decorators/step';
import config from '../../config';

export default class HomePage extends BasePage {
  @step()
  async acceptPrivacyIfVisible() {
    if (await this.privacyConsentButton.isVisible()) {
      await this.privacyConsentButton.click();
    }
  }

  @step()
  private async navigateToHomePage() {
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
