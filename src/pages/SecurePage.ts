import { Locator, type Page } from '@playwright/test';

export class SecurePage {
    readonly page: Page;
    readonly url: string = "/secure";
    readonly flashMessage: Locator;
    readonly loginOutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.flashMessage = page.locator("#flash");
        this.loginOutButton = page.locator(".button.secondary.radius");
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async logout(): Promise<void> {
        await this.loginOutButton.click();
    }
    
    async goBack(): Promise<void> {
        await this.page.goBack();
    }
}