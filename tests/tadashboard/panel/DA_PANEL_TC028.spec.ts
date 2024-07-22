import { test } from "fixtures/common-fixture";
import DashboardMainPage from "pages/dashboard-main-page";
import NewPanelForm from "pages/new-panel-form";
import { DateTimeHelper } from "support/helpers/date-time-helper";

let dashboardMPage: DashboardMainPage;
const pageName = DateTimeHelper.getToday();

test("Verify that when 'Add New Panel' form is on focused all other control/form is disabled or locked.", async ({
  dashboardMainPage,
  newPanelForm,
  choosePanelsPage
}) => {

  // Navigate to Dashboard login page
  // Login with valid account
  // Click Administer link
  await dashboardMainPage.expandChoosePanels();

  //Click on Add new panel button
  await choosePanelsPage.clickAddPanel();


  // Verify that "Add New Panel" form is on focused
  await newPanelForm.focus();

  //Verify that all other control/form is disabled or locked.
  await newPanelForm.disableOrLockOtherControl();

});
