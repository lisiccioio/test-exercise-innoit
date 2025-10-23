import { expect } from '@playwright/test';
import { test } from '../src/fixtures';

test("Tables page test", async ({ tablesPage }) => {
    await test.step("Navigate to Tables page", async () => {
        await tablesPage.goto();
    });

    await test.step("Sort Table 2 by \"Due\" column in descending order", async () => {
        await tablesPage.sortTableByColomnName(2, "Due", false);
    });

    await test.step("Check the value of the \“Due\” column in the second row in Table 2", async () => {
        await expect(await tablesPage.getCellFromTableBody(2, 1, "Due")).toHaveText("$51.00");
    });

    await test.step("Sort Table 1 by \"Due\" column in descending order", async () => {
        await tablesPage.sortTableByColomnName(1, "Due", false);
    });
    await test.step("Check the value of the \“Due\” column in the second row in Table 1", async () => {
        await expect(await tablesPage.getCellFromTableBody(1, 1, "Due")).toHaveText("$51.00");
    });
});