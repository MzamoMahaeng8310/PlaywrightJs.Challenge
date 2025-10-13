import { expect } from '@playwright/test';
import {FakerData} from  '../../test-data/FakerData.js';

export class LoginPage {
    constructor(page) {

        this.page = page;
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.errorMessage = '[data-test="error"]';
    }

    async goto() {

        await this.page.goto('/');
    }

    async login(username, password){
        await this.page.fill(this.usernameInput,username);
        await this.page.fill(this.passwordInput,password);
        await this.page.locator(this.loginButton).click();

    }
    async isErrorVisible(){

        return  this.page.locator(this.errorMessage).isVisible();
    }

    async getErrorText(){

        return this.page.locator(this.errorMessage).innerText();
    }

    async exppectLoginPage(){

        await expect(this.page).toHaveURL(/\/$/);

    }

















}