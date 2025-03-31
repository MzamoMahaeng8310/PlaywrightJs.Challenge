import { expect } from '@playwright/test'
export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryCounter = '.inventory_list';
        this.inventoryItems = '.inventory_item';
       

    }

    async expectOnInventoryPage(){

       
        await expect(this.page).toHaveURL(/inventory\.html$/);
        await expect(this.page.locator(this.inventoryCounter)).toBeVisible();

    }

    async getItemCount(){
        return this.page.locator(this.inventoryItems).count()

    }

    async addITemToCard(itemName){
        const itemLocator = this.page.locator(`.inventory_item:has-text("${itemName}")`);
        await itemLocator.locator('button:has-text("Add to cart")').click();



    }













}