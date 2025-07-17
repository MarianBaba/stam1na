import { Locator, Page } from 'playwright';
import env from '../../utils/env';
import { step } from '../../decorators/step';

export default abstract class BasePage {
  protected static readonly viewportSize = {
    width: +env.VIEWPORT_WIDTH,
    height: +env.VIEWPORT_HEIGHT,
  };
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  @step()
  async goto(url: string): Promise<void> {
    new URL(url); // check if url is well formed
    await this.page.goto(url);
  }

  async scrollToElement(element: string | Locator): Promise<void> {
    const locator = typeof element === 'string' ? this.page.locator(element) : element;
    await locator.scrollIntoViewIfNeeded();
  }
}
