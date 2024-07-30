import { test } from "fixtures/common-fixture";

test("Verify that all Pre-set Data Profiles are populated correctly", async ({
  dashboardMainPage,
  dataProfilesPage,
}) => {
  // Navigate to Dashboard login page
  // Select a specific repository
  // Enter valid Username and Password
  // Click Login
  // Click Administer->Data Profiles
  await dashboardMainPage.openDataProfilesPage();

  //Click on Add new panel button
  await dataProfilesPage.verifyPresetDataProfilePopulated();
});
