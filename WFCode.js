//WebActions.js (common reusable class)
class WebActions {
  constructor(page) {
    this.page = page;
  }

  async clickElement(locator) {
    await this.page.click(locator);
  }

  async enterText(locator, text) {
    await this.page.fill(locator, text);
  }

  async selectDropdown(locator, value) {
    await this.page.selectOption(locator, value);
  }

  async getElementText(locator) {
    return await this.page.textContent(locator);
  }

  async isElementVisible(locator) {
    return await this.page.isVisible(locator);
  }

  async handlePopup(action = "accept") {
    this.page.once("dialog", async dialog => {
      if (action === "accept") {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }
}

module.exports = WebActions;


//LoginPageObjects.js (locators only)
class LoginPageObjects {
  constructor() {
    this.usernameField = '#username';
    this.passwordField = '#password';
    this.loginButton   = '#loginBtn';
    this.errorMessage  = '.error-message';
  }
}

module.exports = LoginPageObjects;


//LoginPage.js (glue class)
const WebActions = require('./WebActions');
const LoginPageObjects = require('./LoginPageObjects');

class LoginPage extends WebActions {
  constructor(page) {
    super(page);
    this.locators = new LoginPageObjects();
  }

  async login(username, password) {
    await this.enterText(this.locators.usernameField, username);
    await this.enterText(this.locators.passwordField, password);
    await this.clickElement(this.locators.loginButton);
  }

  async getErrorMessage() {
    return await this.getElementText(this.locators.errorMessage);
  }
}

module.exports = LoginPage;


tests/
  pages/
    WebActions.js
    LoginPageObjects.js
    LoginPage.js
  fixtures/
    test-base.js

    fixtures/test-base.js

//Here we extend the Playwright test object with our custom fixture.

const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

// Extend the default test with our own fixtures
const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);  // injects into the test
  },
});

module.exports = { test, expect: base.expect };

//🔹 Example test using the fixture

//Now you don’t need to new LoginPage(page) in every test.

const { test, expect } = require('../fixtures/test-base');

test('Login with invalid credentials', async ({ loginPage }) => {
  await loginPage.page.goto('https://example.com/login');
  await loginPage.login('wrongUser', 'wrongPass');

  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Invalid username or password');
});

🔹 Benefits

loginPage is injected automatically by Playwright’s fixture system.

You can add more fixtures the same way (e.g., dashboardPage, apiUtils, dbUtils).

Test files stay super clean.