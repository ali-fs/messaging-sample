import { expect, Page } from "@playwright/test";

export const doLogin = async (page: Page) => {
  await page.goto("http://localhost:5173/login");
  const username = page.getByTestId("username");
  const password = page.getByTestId("password");
  const loginBtn = page.getByTestId("login-btn");
  await username.fill("user1");
  await password.fill("user1");
  await loginBtn.click();
  await expect(page).toHaveURL("http://localhost:5173");
};
