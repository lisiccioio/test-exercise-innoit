import { Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly url: string = "/login";
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly flashMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator("#username");
        this.password = page.locator("#password");
        this.loginButton = page.locator("[type=\"submit\"]");
        this.flashMessage = page.locator("#flash");
    }
    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async fillUsername(username: string): Promise<void> {
        await this.username.fill(username);
    }

    async fillPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string):Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }
    
    async reload(): Promise<void> {
        await this.page.reload();
    }
}