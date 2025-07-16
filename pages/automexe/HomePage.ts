import { Locator } from "playwright";
import BasePage from "../base/BasePage";

export default class HomePage extends BasePage {
    private readonly button: Locator = this.page.locator("[aria-label='Consent']");

	async goToLoginPage() {
		await this.button.click();
	}
}
