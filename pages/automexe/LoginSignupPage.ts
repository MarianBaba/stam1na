import { Locator, Page, expect } from '@playwright/test';
import { step } from '../../decorators/step';
import BasePage from '../base/BasePage';
import config from '../../config';
import { User } from '../../resources/data/user/types';

export class LoginSignupPage extends BasePage {
  private readonly path = `/login`;

  private readonly loginEmailInput: Locator = this.page.locator('input[data-qa="login-email"]');
  private readonly loginPasswordInput: Locator = this.page.locator('input[data-qa="login-password"]');
  private readonly loginButton: Locator = this.page.locator('button[data-qa="login-button"]');
  private readonly signupNameInput: Locator = this.page.locator('input[data-qa="signup-name"]');
  private readonly signupEmailInput: Locator = this.page.locator('input[data-qa="signup-email"]');
  private readonly signupButton: Locator = this.page.locator('button[data-qa="signup-button"]');

  constructor(page: Page) {
    super(page);
  }

  @step()
  public async assertUrl(): Promise<void> {
    await expect(this.page, `unexpected url`).toHaveURL(this.url);
  }

  @step()
  async navigate(): Promise<void> {
    await this.goto(`${config.url}${this.path}`);
  }

  private get url(): string {
    return `${config.url}${this.path}`;
  }

  @step()
  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  @step()
  async signup(user: User): Promise<void> {
    await this.signupNameInput.fill(user.firstName);
    await this.signupEmailInput.fill(user.email);
    await this.signupButton.click();
  }

  @step()
  private async fillSignupNameInput(name: string): Promise<void> {
    await this.signupNameInput.fill(name);
  }

  @step()
  private async fillSignupEmail(email: string): Promise<void> {
    await this.signupEmailInput.fill(email);
  }
}
