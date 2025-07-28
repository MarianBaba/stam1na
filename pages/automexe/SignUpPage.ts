import { Page } from 'playwright';
import config from '../../config';
import { step } from '../../decorators/step';
import BasePage from '../base/BasePage';
import { expect, Locator } from 'playwright/test';
import { User } from '../../resources/data/user/types';
import { Title } from '../../enums/Title';

export default class SignUpPage extends BasePage {
  private readonly path = '/signup';

  private readonly titleMaleRadioButton: Locator = this.page.locator('[id=uniform-id_gender1]');
  private readonly titleFemaleRadioButton: Locator = this.page.locator('[id=uniform-id_gender2]');
  private readonly passwordInput: Locator = this.page.locator('[id=password]');
  private readonly daysLocator: string = '[id=days]';
  private readonly monthsLocator: string = '[id=months]';
  private readonly yearsLocator: string = '[id=years]';
  private readonly dayOfBirthSelect: Locator = this.page.locator(this.daysLocator);
  private readonly monthOfBirthSelect: Locator = this.page.locator(this.monthsLocator);
  private readonly yearOfBirthSelect: Locator = this.page.locator(this.yearsLocator);
  private readonly firstNameInput: Locator = this.page.locator('[id=first_name]');
  private readonly lastNameInput: Locator = this.page.locator('[id=last_name]');
  private readonly companyInput: Locator = this.page.locator('[id=company]');
  private readonly addressInput: Locator = this.page.locator('[id=address1]');
  private readonly countrySelect: Locator = this.page.locator('[id=country]');
  private readonly stateInput: Locator = this.page.locator('[id=state]');
  private readonly cityInput: Locator = this.page.locator('[id=city]');
  private readonly zipcodeInput: Locator = this.page.locator('[id=zipcode]');
  private readonly mobileNumberInput: Locator = this.page.locator('[id=mobile_number]');
  private readonly signUpSubmitButton: Locator = this.page.locator('[data-qa=create-account]');
  private readonly accountCreatedTitle: Locator = this.page.locator('[data-qa="account-created"]');

  private get url(): string {
    return `${config.url}${this.path}`;
  }

  @step()
  public async assertUrl(): Promise<void> {
    await expect(this.page, `unexpected url`).toHaveURL(this.url);
  }

  @step()
  async navigate(): Promise<void> {
    await this.goto(`${config.url}${this.path}`);
  }
  @step()
  private async selectTitle(title: Title): Promise<void> {
    await this.titleMaleRadioButton.scrollIntoViewIfNeeded();
    if (title === Title.MR) {
      await this.titleMaleRadioButton.click();
    } else {
      await this.titleFemaleRadioButton.click();
    }
  }
  @step()
  private async fillPassword(password: string): Promise<void> {
    await this.passwordInput.scrollIntoViewIfNeeded();
    await this.passwordInput.fill(password);
  }
  @step()
  private async selectBirthDate(day: string, month: string, year: string): Promise<void> {
    await this.scroll(this.dayOfBirthSelect);
    await this.page.selectOption(this.daysLocator, day);
    await this.scroll(this.monthOfBirthSelect);
    await this.page.selectOption(this.monthsLocator, month);
    await this.scroll(this.yearOfBirthSelect);
    await this.page.selectOption(this.yearsLocator, year);
  }
  @step()
  private async fillPersonalInfo(user: User): Promise<void> {
    await this.scroll(this.firstNameInput);
    await this.firstNameInput.fill(user.firstName);

    await this.scroll(this.lastNameInput);
    await this.lastNameInput.fill(user.familyName);

    await this.scroll(this.companyInput);
    await this.companyInput.fill(user.company);
  }
  @step()
  private async selectCountry(country: string): Promise<void> {
    await this.scroll(this.countrySelect);
    await this.page.selectOption('[id=country]', country);
  }
  @step()
  private async fillAddress(user: User): Promise<void> {
    await this.scroll(this.addressInput);
    await this.addressInput.fill(user.address);

    await this.scroll(this.stateInput);
    await this.stateInput.fill(user.state);

    await this.scroll(this.cityInput);
    await this.cityInput.fill(user.city);

    await this.scroll(this.zipcodeInput);
    await this.zipcodeInput.fill(user.zipcode);

    await this.scroll(this.mobileNumberInput);
    await this.mobileNumberInput.fill(user.mobileNumber);
  }

  @step()
  private async submitSignupForm(): Promise<void> {
    await this.scroll(this.signUpSubmitButton);
    await this.signUpSubmitButton.click();
  }

  @step()
  public async signup(user: User): Promise<void> {
    const [year, month, day] = user.birthDay.split('-');
    const normalizedMonth = String(Number(month));

    await this.selectTitle(user.title);
    await this.fillPassword(user.password);
    await this.selectBirthDate(day, normalizedMonth, year);
    await this.fillPersonalInfo(user);
    await this.selectCountry(user.country);
    await this.fillAddress(user);
    await this.submitSignupForm();
    await this.accountCreatedTitle.waitFor({ state: 'visible', timeout: 3000 });
  }

  private async scroll(locator: Locator) {
    await locator.evaluate((element) => {
      element.scrollIntoView({ behavior: 'instant', block: 'center' });
    })
  }
}
