import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async sortBy(option: string) {
    const sortDropdown = this.page.locator('[data-test="product-sort-container"]');
    await sortDropdown.selectOption({ label: option });
  }

  async addItemToCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async getCartBadge() {
    return this.page.locator('.shopping_cart_badge').innerText();
  }

  async getFirstItemName() {
    return this.page.locator('.inventory_item_name').first().innerText();
  }

  async getFirstItemPrice() {
    return this.page.locator('.inventory_item_price').first().innerText();
  }
}
