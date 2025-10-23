import { Locator, type Page } from '@playwright/test';

type ColumnName = "Last Name" | "First Name" | "Email" | "Due" | "Web Site";
type TableNumber = 1 | 2;

export class TablesPage {
    readonly page: Page;
    readonly url: string = "/tables";

    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async sortTableByColomnName(table: TableNumber, columnName: ColumnName, ascending: boolean = true): Promise<void> {
        const columnHeader = this.page.locator(`#table${table} th`, { hasText: columnName });
        await columnHeader.click();
        if (!ascending) {
            await columnHeader.click();
        }
    }

    async getCellFromTableBody(table: TableNumber, row: number, columnName: ColumnName): Promise<Locator> {
        switch (columnName) {
            case "Last Name":
                return table === 1
                    ? this.page.locator(`#table${table} tbody tr`).nth(row).locator(`td`).nth(0)
                    : this.page.locator(`#table${table} tbody tr`).nth(row).locator(`td.last-name`);
            case "First Name":
                return table === 1
                    ? this.page.locator(`#table${table} tbody tr`).nth(row).locator(`td`).nth(1)
                    : this.page.locator(`#table${table} tbody tr`).nth(row).locator(`td.first-name`);
            case "Email":
                return table === 1
                    ? this.page.locator(`#table${table} tbody tr`).nth(row).locator(`td`).nth(2)
                    : this.page.locator(`#table${table} tbody tr`).nth(row).locator(`td.email`);
            case "Due":
                return table === 1
                    ? this.page.locator(`#table${table} tbody tr`).nth(row).locator(`td`).nth(3)
                    : this.page.locator(`#table${table} tbody tr`).nth(row).locator(`td.dues`);
            case "Web Site":
                return table === 1
                    ? this.page.locator(`#table${table} tbody tr`).nth(row).locator(`td`).nth(4)
                    : this.page.locator(`#table${table} tbody tr`).nth(row).locator(`td.web-site`);
            default:
                throw new Error("Get cell from the table failed");
        }
    }
}
