import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.click('.shopping_cart_link');
  }

  async removeItem(itemName: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async isCartEmpty() {
    return (await this.page.locator('.cart_item').count()) === 0;
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }
}
