import { test as base } from "@playwright/test";
import DashboardMainPage from "pages/dashboard-main-page";
import LoginPage from "pages/login-page";
import NewPageForm from "pages/new-page-form";
import users from "fixtures/data/users.json";
import _ from "underscore";

// Declare the types of your fixtures.
type CommonFixture = {
  dashboardMainPage: DashboardMainPage;
  newPageForm: NewPageForm;
};

export type Options = { defaultRepo: string };

type Account = {
  username: string;
  password: string;
};

// Extend base test.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<Options & CommonFixture, { account: Account }>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  defaultRepo: ["SampleRepository", { option: true }],

  account: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use, workerInfo) => {
      // Unique username.
      let username: string;
      let password: string;

      // Use default user if worker = 1
      if (workerInfo.config.workers === 1) {
        username = users.adminUser.username;
        password = users.adminUser.password;
      } else if (users.parallelUsers[workerInfo.workerIndex] !== undefined) {
        username = users.parallelUsers[workerInfo.workerIndex].username;
        password = users.parallelUsers[workerInfo.workerIndex].password;
      } else {
        const idx = _.random(0, users.parallelUsers.length - 1);
        username = users.parallelUsers[idx].username;
        password = users.parallelUsers[idx].password;
      }

      // Use the account value.
      await use({ username, password });
    },
    { scope: "worker" },
  ],

  dashboardMainPage: async ({ page, defaultRepo, account }, use) => {
    // Sign in with our account.
    const { username, password } = account;

    // Set up the fixture.
    const loginPage = new LoginPage(page);

    // Navigate to Dashboard login page
    await loginPage.open();

    // Log in specific repository with valid account
    await loginPage.login(username, password, defaultRepo);

    // Use the fixture value in the test.
    await use(new DashboardMainPage(page));
  },

  newPageForm: async ({ page }, use) => {
    await use(new NewPageForm(page));
  },
});

export { expect, Page, Locator } from "@playwright/test";
