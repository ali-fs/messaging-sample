import { test, expect } from "@playwright/test";

// TODO: needs more configuration for base url and helpers
// TODO: we need to use env

test("must navigate to login page if user is not logged in", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  await expect(page).toHaveURL("http://localhost:5173/login");
});

test("should be able to successful login", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  const username = page.getByTestId("username");
  const password = page.getByTestId("password");
  const loginBtn = page.getByTestId("login-btn");
  await username.fill("user1");
  await password.fill("user1");
  await loginBtn.click();
  await expect(page).toHaveURL("http://localhost:5173");
});
