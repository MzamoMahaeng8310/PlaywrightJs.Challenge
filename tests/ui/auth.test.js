import {test , expect} from '@playwright/test';;
import {LoginPage} from '../../pages/login.page.js';
import {InventoryPage} from '../../pages/inventory.page.js';
import uiCredentials  from '../../test-data/uiCredentials.json' assert {type : 'json'};

test.describe.serial('UI Authentication Test For Multiple Users', () => {
    for(const user of uiCredentials.validUsers){
        test( `This is the login for valid users : ${user.description}`, async ({page}) => {
            const loginPage = new LoginPage(page);
            const inventoryPage = new InventoryPage(page);
            await loginPage.goto();
            await loginPage.login(user.username, user.password);

            if(user.username == 'locked_out_user' ){

                expect(await loginPage.isErrorVisible()).toBeTruthy();
                const errText = await loginPage.getErrorText();
                expect(errText).toContain('Epic sadface: Sorry, this user has been locked out.');
            }else if(user.username == 'performance_glitch_user'){
                await page.waitForSelector('.inventory_list',{state: 'visible'});
                await inventoryPage.expectOnInventoryPage();
            }else{
                await inventoryPage.expectOnInventoryPage();
            }
        });
        
    };

    for( const user of uiCredentials.InvalidUsers){
        test(`Login with an invalid non existent user profile: ${user.description}`, async ({page}) =>{
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.login(user.username, user.password);

            expect(await loginPage.isErrorVisible()).toBeTruthy();
            expect(await loginPage.getErrorText()).toContain('Epic sadface: Username and password do not match any user in this service');


        });


    }





});