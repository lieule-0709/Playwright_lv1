import { test } from "fixtures/common-fixture";


test("Verify that when 'Add New Panel' form is on focused all other control/form is disabled or locked.", async ({
  dashboardMainPage,
  dataProfilesPage,
}) => {

  // Navigate to Dashboard login page
  // Select a specific repository 
  // Enter valid Username and Password
  // Click Login
  // Click Administer->Data Profiles
  await dataProfilesPage.open();

  //Click on Add new panel button
  await dataProfilesPage.presetDataProfilePopulated()

});
