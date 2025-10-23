import { expect } from '@playwright/test';
import { test } from '../src/fixtures';

test("Dropdown page test", async ({ dropdownPage }) => {
  await test.step("Navigate to Dropdown page and verify the default option", async () => {
    await dropdownPage.goto();
    await expect(dropdownPage.selectedOption).toHaveText("Please select an option");
  });

  await test.step("Select the first option and verify", async () => {
    await dropdownPage.selectDropdownListOption("1");
    await expect(dropdownPage.selectedOption).toHaveText("Option 1");
  });

  await test.step("Select the second option and verify", async () => {
    await dropdownPage.selectDropdownListOption("2");
    await expect(dropdownPage.selectedOption).toHaveText("Option 2");
  });
});