import {test,expect} from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { InventoryPage } from '../../pages/inventory.page.js';
import { CartPage } from '../../pages/cart.page.js';
import uiCredentials from '../../test-data/uiCredentials.json' assert {type: 'json'};
test.describe.serial('UI Testing', () => {

    test.beforeEach(async ({page}) =>{

        const loginPage = new  LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        const user = uiCredentials.validUsers.find(y => y.username =='standard_user');
        await loginPage.goto();
        await loginPage.login(user.username,user.password);

        await inventoryPage.expectOnInventoryPage();

    });

    test('Add a single item to the cart' , async ({page}) =>{
        const cartPage = new CartPage(page);
        await page.click('.inventory_item button:has-text("Add to cart")');
        const badgeCount = await cartPage.getCartBadgeCount();
        expect(badgeCount).toBe('1');



    });

    test('Add a specific item to the cart and verify the badge' , async ({page}) =>{
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addITemToCard('Sauce Labs Backpack');
        const badgeCount = await cartPage.getCartBadgeCount();
        expect(badgeCount).toBe('1');

    }); 





});