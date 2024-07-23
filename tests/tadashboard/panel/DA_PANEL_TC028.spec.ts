import { test } from "fixtures/common-fixture";

test("Verify that when 'Add New Panel' form is on focused all other control/form is disabled or locked.", async ({
  dashboardMainPage,
  newPanelForm,
  panelsPage,
}) => {
  // Navigate to Dashboard login page
  // Login with valid account
  // Click Administer link
  // Click Panel link
  await dashboardMainPage.selectHeadMenu("Administer -> Panels");

  //Click on Add new panel button
  await panelsPage.clickAddNew();

  //Verify that all other control/form is disabled or locked.
  await newPanelForm.disableOrLockOtherControl();
});
