import { Page } from 'playwright';
import config from '../../config';
import { step } from '../../decorators/step';
import BasePage from '../base/BasePage';
import { expect, Locator } from 'playwright/test';

export default class SignUpPage extends BasePage {
  private readonly path = '/login';
  private readonly signupNameInput: Locator = this.page.locator('[data-qa="signup-name"]');
  private readonly signupPasswordInput: Locator = this.page.locator('[data-qa="signup-email"]');
  private readonly signupSubmitButton: Locator = this.page.locator('[data-qa="signup-button"]');
  
  private async navigateToSignUpPage() {
    await this.goto(`${config.url}${this.path}`);
  }

  private get fullUrl(): string {
    return `${config.url}${this.path}`;
  }

  @step()
  public async assertUrl(): Promise<void> {
    await expect(this.page, 'unexpected url').toHaveURL(this.fullUrl);
  }

  public static async openInNewTab(page: Page): Promise<SignUpPage> {
    const newPage = await BasePage.openEmptyPage(page);
    const signUpPage = new this(newPage);
    await signUpPage.navigateToSignUpPage();
    return signUpPage;
  }

  @step()
  public async fillSignupNameInput(name: string): Promise<void> {
    await this.signupNameInput.fill(name);
  }

  @step()
  public async fillSignupPasswordInput(password: string): Promise<void> {
    await this.signupPasswordInput.fill(password);
  }

  @step()
  public async submitFirstSignupForm(): Promise<void> {
    await this.signupSubmitButton.click();
  }

}
