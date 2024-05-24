import { test as setup, expect } from "@playwright/test";
import { ADMIN, STUDENT } from "../stabs/users";
import { staffFile, studentFile } from "../constants";

setup.describe.configure({ mode: "serial" });
setup.describe("auth", () => {
  setup("authenticate as staff", async ({ page }) => {
    await page.goto("/auth/sign-in?callbackUrl=/");
    await page.getByLabel("Email").fill(ADMIN.email);
    await page.getByRole("button", { name: "Войти через Email" }).click();

    await page.getByRole("link", { name: "Упрощённый тестовый вход" }).click();
    await page.waitForURL("/");
    await expect(page.getByRole("button", { name: "AD" })).toBeVisible();

    await page.context().storageState({ path: staffFile });
  });

  setup("authenticate as student", async ({ page }) => {
    await page.goto("/auth/sign-in?callbackUrl=/");
    await page.getByLabel("Email").fill(STUDENT.email);
    await page.getByRole("button", { name: "Войти через Email" }).click();
    // To handle verification emails
    await page.getByRole("link", { name: "Упрощённый тестовый вход" }).click();
    await page.waitForURL("/");
    await expect(page.getByRole("button", { name: "US" })).toBeVisible();

    await page.context().storageState({ path: studentFile });
  });
});
