import test, { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Sort Feature', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
  });

 test('Sort A to Z', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!); 

  const inventory = new InventoryPage(page);
  await inventory.sortBy('Name (A to Z)');
  const firstItem = await inventory.getFirstItemName();
  expect(firstItem).toBe('Sauce Labs Backpack');
});


  test('Sort Price High to Low', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('Price (high to low)');

    const firstPrice = await inventory.getFirstItemPrice();
    console.log('First price after sorting High to Low:', firstPrice);
    expect(firstPrice).toBe('$49.99');
  });
});
