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
  public async signup(user: User): Promise<void> {
    const birthDay = '1978-03-21';
    const [year, month, day] = birthDay.split('-');

    user.title === Title.MR
      ? await this.titleMaleRadioButton.click()
      : await this.titleFemaleRadioButton.click();
    this.passwordInput.fill(user.password);
    await this.page.selectOption(this.daysLocator, day);
    await this.page.selectOption(this.monthsLocator, month);
    await this.page.selectOption(this.yearsLocator, year);
    this.firstNameInput.fill(user.firstName);
    this.lastNameInput.fill(user.familyName);
    this.companyInput.fill(user.company);
    this.addressInput.fill(user.address);
    await this.page.selectOption("[id=country]", "United States");
    this.stateInput.fill(user.state);
    this.cityInput.fill(user.city);
    this.zipcodeInput.fill(user.zipcode);
    this.mobileNumberInput.fill(user.mobileNumber);
  }
}
