import test, { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Process', () => {
  test('Complete checkout flow', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);

    const inventory = new InventoryPage(page);
    await inventory.addItemToCart('Sauce Labs Backpack');

    const cart = new CartPage(page);
    await cart.goto();
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.fillInformation('Abdullah', 'Othman', 'P400');
    await checkout.finish();

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});
