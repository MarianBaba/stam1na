import { Locator, Page } from "playwright";

export default abstract class BasePage {
	public readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goto(url: string): Promise<void> {
		new URL(url); // check if url is well formed
		await this.page.goto(url);
	}

	async scrollToElement(element: string | Locator): Promise<void> {
		const locator = typeof element === "string" ? this.page.locator(element) : element;
		await locator.scrollIntoViewIfNeeded();
	}
}
