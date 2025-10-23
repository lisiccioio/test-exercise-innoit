import { test as base } from '@playwright/test';
import { DropdownPage } from './pages/DropdownPage';
import { LoginPage } from './pages/LoginPage';
import { SecurePage } from './pages/SecurePage';
import { TablesPage } from './pages/TablesPage';

type MyFixtures = {
    dropdownPage: DropdownPage;
    loginPageOpened: LoginPage;
    tablesPage: TablesPage;
    securePage: SecurePage;
};

export const test = base.extend<MyFixtures>({
    dropdownPage: async ({ page }, use) => {
        await use(new DropdownPage(page));
    },
    loginPageOpened: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    },
    securePage: async ({ page }, use) => {
        await use(new SecurePage(page));
    },
    tablesPage: async ({ page }, use) => {
        await use(new TablesPage(page));
    }
});
