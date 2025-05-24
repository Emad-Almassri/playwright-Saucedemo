# 🔍 Playwright E2E Testing – SauceDemo

This project is an **End-to-End (E2E) testing framework** for [SauceDemo](https://www.saucedemo.com), built using **Playwright** and **TypeScript**.  
It follows best practices like the **Page Object Model (POM)**, **test grouping**, **parameterized tests**, and **global login session reuse** for fast and reliable testing.

---

## 📁 Project Structure

```
project-root/
│
├── pages/                 # Page Object classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CartPage.ts
│
├── tests/                 # Test specifications
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
│
├── global-setup.ts        # Sets up authenticated session once
├── playwright.config.ts   # Playwright configuration
├── storageState.json      # Saved login state (auto-generated)
├── .env                   # Contains credentials
└── README.md
```

---

## 🚀 Features

- ✅ **Playwright + TypeScript**
- ✅ **Page Object Model (POM)** structure
- ✅ **Global login session reuse** via `storageState`
- ✅ **Environment variable support** with `.env`
- ✅ **Hooks** (`beforeEach`, `beforeAll`) to optimize setup
- ✅ **Test grouping** with `test.describe`
- ✅ **Parameterized testing** with dynamic test data
- ✅ **Cross-browser support** (Chromium, Firefox, WebKit)

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Emad-Almassri/playwright-Saucedemo.git
cd playwright-saucedemo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce

SAUCE_WRONG_USERNAME= abdullah
SAUCE_WRONG_PASSWORD=123456
```

### 4. Run tests

```bash
npx playwright test
```

---

## 🧪 Example Tests

```ts
test.describe('Login Feature', () => {
  test('User sees inventory after login', async ({ page }) => {
    await page.goto('/');
    const items = await page.locator('.inventory_item').count();
    expect(items).toBeGreaterThan(0);
  });
});
```

---

## 🖥 Supported Browsers

- ✅ Chromium
- ✅ Firefox

Use Playwright’s built-in cross-browser testing:
```bash
npx playwright test --project=firefox
```
