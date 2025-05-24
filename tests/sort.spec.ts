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
    const inventory = new InventoryPage(page);
    await inventory.sortBy('Name (A to Z)');
    const itemNames = await inventory.getAllItemNames(); 
    const sortedNames = [...itemNames].sort((a, b) => a.localeCompare(b));

    console.log('Actual names:', itemNames);
    console.log('Expected sorted names:', sortedNames);

    expect(itemNames).toEqual(sortedNames); 
  });

   test('Sort Z to A', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('Name (Z to A)');
    const itemNames = await inventory.getAllItemNames();
    const sortedNames = [...itemNames].sort((a, b) => b.localeCompare(a)); 

    console.log('Actual names:', itemNames);
    console.log('Expected reverse sorted names:', sortedNames);

    expect(itemNames).toEqual(sortedNames);
  });

  test('Sort Price High to Low', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('Price (high to low)');

    const prices = await inventory.getAllItemPrices(); 
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => b - a); 

    console.log('Actual prices:', numericPrices);
    console.log('Expected sorted prices:', sortedPrices);

    expect(numericPrices).toEqual(sortedPrices);
  });

  test('Sort Price Low to High', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('Price (low to high)');
    const prices = await inventory.getAllItemPrices();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b); 

    console.log('Actual prices:', numericPrices);
    console.log('Expected sorted prices:', sortedPrices);

    expect(numericPrices).toEqual(sortedPrices);
  });

});
