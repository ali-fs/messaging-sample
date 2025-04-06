import { expect, test } from "@playwright/test";
import { doLogin } from "./helper";

test.beforeEach(async ({ page }) => {
  await doLogin(page);
});

test.describe("Messaging functionality", () => {
  test("must load group  messages correctly", async ({ page }) => {
    const groupSelector = await page.getByText("group1");
    await expect(groupSelector).toBeVisible();

    await groupSelector.click();
    const helloMessage = await page.getByText("Hello");
    await expect(helloMessage).toBeVisible();
  });

  test("must send message and see the result correctly", async ({ page }) => {
    const messageToSend = `response-${Date.now()}`;
    const groupSelector = await page.getByText("group1");
    await expect(groupSelector).toBeVisible();
    await groupSelector.click();

    const newMessage = page.getByTestId("new-message");
    const sendMessageBtn = page.getByTestId("send-message-btn");
    await newMessage.fill(messageToSend);
    await sendMessageBtn.click();

    await expect(newMessage).toHaveText("");
    const responseMessage = await page.getByText(messageToSend);
    await expect(responseMessage).toBeVisible();
  });

  test("messages in different groups must be separate", async ({ page }) => {
    const group1Selector = await page.getByText("group1");
    const group2Selector = await page.getByText("group2");
    await expect(group1Selector).toBeVisible();
    await expect(group2Selector).toBeVisible();

    await group1Selector.click();
    const helloMessage = await page.getByText("Hello");
    await expect(helloMessage).toBeVisible();

    await group2Selector.click();
    await expect(helloMessage).not.toBeVisible();
  });
});
