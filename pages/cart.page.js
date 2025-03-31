import { expect } from '@playwright/test';

export class CartPage {


    constructor(page) {
        this.page = page;
        this.cartBadge = '.shopping_cart_badge';
        this.checkoutButton = '[data-test="checkout"]';
        this.checkoutLiink = '.shopping_cart_link';
        this.clickFirstCartItem = '#add-to-cart-sauce-labs-backpack'

    }

    async openCart() {
        await this.page.locator(this.checkoutLiink).click();


    }

    async clickFirstCartITem() {

        await this.page.locator(this.clickFirstCartItem).click();

    }

    async getCartBadgeCount() {
        const visible = await this.page.locator(this.cartBadge).isVisible();
        if (visible) {
            return this.page.locator(this.cartBadge).innerText();
        }
        return 0;
    }

    async proceedToCheckout(){

        await this.page.click(this.checkoutButton);
    }













}