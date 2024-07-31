import { test as test1 } from "fixtures/login-fixture";
import { test as test2 } from "fixtures/common-fixture";
import { mergeTests } from "@playwright/test";

import DashboardMainPage from "pages/dashboard-main-page";
import { DateTimeHelper } from "support/helpers/date-time-helper";
import users from "fixtures/data/users.json";

const test = mergeTests(test1, test2);
let dashboardMPage: DashboardMainPage;
const pageName = DateTimeHelper.getToday();

test("Verify that 'Public' pages can be visible and accessed by all users of working repository", async ({
  loginPage,
  dashboardMainPage,
  newPageForm,
  account,
}) => {
  dashboardMPage = dashboardMainPage;

  // Navigate to Dashboard login page
  // Log in specific repository with valid account
  // Go to Global Setting -> Add page
  await dashboardMPage.selectSetting("Add Page");

  // Enter Page Name field
  // Check Public checkbox
  // Click OK button
  await newPageForm.create({ pageName: pageName, public: true });

  // Click on Log out link
  await dashboardMPage.selectHeadMenu(`${account.username} -> Logout`);

  // Log in with another valid account
  //(can't create the new acc so I use the existed acc to simulate this step, only do this on exercise :D)
  await loginPage.login(users.adminUser.username, users.adminUser.password);

  // Check newly added page is visible
  await dashboardMPage.verifyPageVisible(pageName);
});

test.afterEach("Delete page", async () => {
  await dashboardMPage.selectMenu(pageName);
  await dashboardMPage.deletePageAndVerifyDialogMessage();
});
