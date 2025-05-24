import test, { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Operations', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
  });

  test('Add item to cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addItemToCart('Sauce Labs Backpack');
    await expect(inventory.getCartBadge()).resolves.toContain('1');
  });

  test('Add multiple items to cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addItemToCart('Sauce Labs Backpack');
    await inventory.addItemToCart('Sauce Labs Bike Light');
    await expect(inventory.getCartBadge()).resolves.toContain('2');
  });

  test('Remove item from cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addItemToCart('Sauce Labs Backpack');
    const cart = new CartPage(page);
    await cart.goto();
    await cart.removeItem('Sauce Labs Backpack');
    await expect(cart.isCartEmpty()).resolves.toBeTruthy();
  });

});