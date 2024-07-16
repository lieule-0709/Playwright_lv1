import { test as base } from "@playwright/test";
import DashboardMainPage from "pages/dashboard-main-page";
import LoginPage from "pages/login-page";

// Declare the types of your fixtures.
type CommonFixture = {
  loginPage: LoginPage;
  dashboardMainPage: DashboardMainPage;
};

export type Options = { defaultRepo: string };

// Extend base test.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<Options & CommonFixture>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  defaultRepo: ["SampleRepository", { option: true }],

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardMainPage: async ({ page }, use) => {
    await use(new DashboardMainPage(page));
  },
});

export { expect, Page, Locator } from "@playwright/test";
