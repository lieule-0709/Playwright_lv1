import { test } from "fixtures/common-fixture";
import DashboardMainPage from "pages/dashboard-main-page";
import { DateTimeHelper } from "support/helpers/date-time-helper";

let dashboardMPage: DashboardMainPage;
const pageName = DateTimeHelper.getToday();

test("Verify that 'Public' pages can be visible and accessed by all users of working repository", async ({
  dashboardMainPage,
  newPageForm,
}) => {
  dashboardMPage = dashboardMainPage;

  // Navigate to Dashboard login page
  // Log in specific repository with valid account
  // Go to Global Setting -> Add page
  await dashboardMainPage.selectSetting("Add Page");

  // Enter Page Name field
  // Check Public checkbox
  // Click OK button
  await newPageForm.create({ pageName: pageName, public: true });

  // Click on Log out link
  // Log in with another valid account
  // Check newly added page is visible
});

test.afterEach("Delete page", async () => {
  await dashboardMPage.selectMenu(pageName);
  await dashboardMPage.deletePageAndVerifyDialogMessage();
});
