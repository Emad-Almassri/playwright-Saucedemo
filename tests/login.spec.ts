import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Login Feature', () => {
  test('Successful login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    const itemCount = await page.locator('.inventory_item').count();
    expect(itemCount).toBeGreaterThan(0); 
  });

  test.fail('Login should fail with wrong credentials', async ({ page }) => {

    const login = new LoginPage(page);
    await login.goto();
    await login.login(process.env.SAUCE_WRONG_USERNAME!, process.env.SAUCE_WRONG_PASSWORD!);
    
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('[data-test="error"]')).toBeVisible(); 
  });

});
