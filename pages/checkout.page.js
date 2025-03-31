import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstnametext = '[data-test="firstName"]';
    this.lastnametext = '[data-test="lastName"]';
    this.zipCodetext = '[data-test="postalCode"]';
    this.continueToOverviewButton = '#continue';
    this.finishCheckoutsButton = '#finish';
  }

  async enterUserInfo(firstName, lastName, zipCode) {
    await this.page.fill(this.firstnametext, firstName);
    await this.page.fill(this.lastnametext, lastName);
    await this.page.fill(this.zipCodetext, zipCode);
  }

  async continueToOverview() {
    await this.page.click( this.continueToOverviewButton);
  }

  async finishCheckout() {
    await this.page.click(this.finishCheckoutsButton);
  }

  async expectCheckoutComplete() {
    const confirmationText = this.page.locator('.complete-header');
    await expect(confirmationText).toHaveText('Thank you for your order!');
  }
}
