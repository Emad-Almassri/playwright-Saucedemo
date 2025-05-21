import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
    
    const errorLocator = this.page.locator('[data-test="error"]');
    if (await errorLocator.isVisible()) {
      const message = await errorLocator.textContent();
      throw new Error(`Login failed: ${message}`);
    }

  }
}
