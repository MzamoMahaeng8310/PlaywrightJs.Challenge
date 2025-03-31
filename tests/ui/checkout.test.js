import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { InventoryPage } from '../../pages/inventory.page.js';
import { CartPage } from '../../pages/cart.page.js';
import { CheckoutPage } from '../../pages/checkout.page.js';
import uiCredentials from '../../test-data/uiCredentials.json' assert { type: 'json' };
import checkout from '../../test-data/checkout.json' assert { type: 'json' };
test.describe.serial('UI Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Login as standard user
    const user = uiCredentials.validUsers.find(u => u.username === 'standard_user');
    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    // Confirm we're on inventory
    await inventoryPage.expectOnInventoryPage();

    // Add an item
    await page.click('.inventory_item button:has-text("Add to cart")');

    // Open cart
    await cartPage.openCart();
  });

  test('Complete checkout flow', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Start checkout
    await page.click('[data-test="checkout"]');  // <--- updated

    // Enter details
    await checkoutPage.enterUserInfo(checkout.data.firstName, checkout.data.lastName,checkout.data.zipCode);
    await checkoutPage.continueToOverview();
    await checkoutPage.finishCheckout();

    // Confirm success
    await checkoutPage.expectCheckoutComplete();
  });
});
