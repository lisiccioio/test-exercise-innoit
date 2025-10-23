import { Locator, type Page } from '@playwright/test';

type DropdownOption = "1" | "2";

export class DropdownPage {
    readonly page: Page;
    readonly url: string = "/dropdown";
    readonly dropdownList: Locator;
    readonly selectedOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dropdownList = page.locator("#dropdown");
        this.selectedOption = page.locator("[selected=\"selected\"]");
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async selectDropdownListOption(optionValue: DropdownOption): Promise<void> {
        await this.dropdownList.selectOption(optionValue);
    }
}