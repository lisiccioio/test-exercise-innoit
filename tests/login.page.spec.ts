import { expect } from '@playwright/test';
import { test } from '../src/fixtures';

test("Successful login", async ({ loginPageOpened, securePage }) => {
    await test.step("Login with correct username and password", async () => {
        await loginPageOpened.login("tomsmith", "SuperSecretPassword!");
    });
    await test.step("Check that user is redirected to Secure page", async () => {
        await expect(loginPageOpened.page).toHaveURL(securePage.url);
    });
    await test.step("Verify successful login message", async () => {
        await expect(securePage.flashMessage).toHaveText(/You logged into a secure area!/);
    });
});

test("Click login with empty fields", async ({ loginPageOpened }) => {
    await test.step("Click login button without filling username and password", async () => {
        await loginPageOpened.clickLoginButton();
    });
    await test.step("Verify error message", async () => {
        await expect(loginPageOpened.flashMessage).toHaveText(/Your username is invalid!/);
    });
});

test("Login with correct username and empty password", async ({ loginPageOpened }) => {
    await test.step("Fill correct username, keep password empty and click login", async () => {
        await loginPageOpened.fillUsername("tomsmith");
        await loginPageOpened.clickLoginButton();
    });
    await test.step("Verify error message", async () => {
        await expect(loginPageOpened.flashMessage).toHaveText(/Your password is invalid!/);
    });
    await test.step("Verify that username and password fields are cleared", async () => {
        await expect(loginPageOpened.username).toBeEmpty();
        await expect(loginPageOpened.password).toBeEmpty();
    });
});

test("Login with correct username and incorrect password", async ({ loginPageOpened }) => {
    await test.step("Fill correct username and incorrect password, then click login", async () => {
        await loginPageOpened.login("tomsmith", "WrongPassword");
    });
    await test.step("Verify error message", async () => {
        await expect(loginPageOpened.flashMessage).toHaveText(/Your password is invalid!/);
    });
    await test.step("Verify that username and password fields are cleared", async () => {
        await expect(loginPageOpened.username).toBeEmpty();
        await expect(loginPageOpened.password).toBeEmpty();
    });
});

test("Login with empty username and correct password", async ({ loginPageOpened }) => {
    await test.step("Keep username empty and fill correct password, then click login", async () => {
        await loginPageOpened.fillPassword("SuperSecretPassword!");
        await loginPageOpened.clickLoginButton();
    });

    await test.step("Verify error message", async () => {
        await expect(loginPageOpened.flashMessage).toHaveText(/Your username is invalid!/);
    });
    await test.step("Verify that username and password fields are cleared", async () => {
        await expect(loginPageOpened.username).toBeEmpty();
        await expect(loginPageOpened.password).toBeEmpty();
    });
});

test("Login with incorrect username and correct password", async ({ loginPageOpened }) => {
    await test.step("Fill incorrect username and correct password, then click login", async () => {
        await loginPageOpened.login("wrongUser", "SuperSecretPassword!");
    });

    await test.step("Verify error message", async () => {
        await expect(loginPageOpened.flashMessage).toHaveText(/Your username is invalid!/);
    });
    await test.step("Verify that username and password fields are cleared", async () => {
        await expect(loginPageOpened.username).toBeEmpty();
        await expect(loginPageOpened.password).toBeEmpty();
    });
});

test("Check that username and password are cleared after page refresh", async ({ loginPageOpened }) => {
    await test.step("Fill username and password fields", async () => {
        await loginPageOpened.fillUsername("someUser");
        await loginPageOpened.fillPassword("somePassword");
    });

    await test.step("Reload the page", async () => {
        await loginPageOpened.reload();
    });

    await test.step("Verify that username and password fields are cleared", async () => {
        await expect(loginPageOpened.username).toBeEmpty();
        await expect(loginPageOpened.password).toBeEmpty();
    });
});

test("Check that username and password are cleared after logout", async ({ loginPageOpened, securePage }) => {
    await test.step("Login with correct username and password", async () => {
        await loginPageOpened.login("tomsmith", "SuperSecretPassword!");
    });
    await test.step("Logout from Secure page", async () => {
        await securePage.logout();
    });
    await test.step("Verify that username and password fields are cleared", async () => {
        await expect(loginPageOpened.username).toBeEmpty();
        await expect(loginPageOpened.password).toBeEmpty();
    });
});

/* This test case fails because of a bug in a software.
   Username and password fields have not been cleared, but they should be */
test.fail("Check that username and password are cleared after navigating back post logout", async ({ loginPageOpened, securePage }) => {
    await test.step("Login with correct username and password", async () => {
        await loginPageOpened.login("tomsmith", "SuperSecretPassword!");
    });
    await test.step("Go back to Login page", async () => {
        await securePage.goBack();
    });

    await test.step("Verify that username and password fields are cleared", async () => {
        await expect(loginPageOpened.username).toBeEmpty();
        await expect(loginPageOpened.password).toBeEmpty();
    });
});
