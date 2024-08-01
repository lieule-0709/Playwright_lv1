import { test } from "fixtures/common-fixture";
import { DateTimeHelper } from "support/helpers/date-time-helper";

const profileName = "Profile-" + DateTimeHelper.getToday();
const newDataProfile = { name: profileName, shortFields: ["Name", "Location"] };

test("Verify that user is able to add levels of fields ", async ({
  dashboardMainPage,
  dataProfilesPage,
  newDataProfilePage,
}) => {
  // Log in Dashboard
  // Navigate to Data Profiles page
  await dashboardMainPage.openDataProfilesPage();

  // Click on "Add New"
  await dataProfilesPage.clickAddNew();

  // Input to "Name *" field
  // Click on Next button
  await newDataProfilePage.enterGeneralSetting(newDataProfile);

  // Navigate to Sort Fields page
  // Click on "Field" dropped down menu
  // Select an item
  // Click on "Add Level" button
  await newDataProfilePage.addSortField(newDataProfile.shortFields[0]);

  // Check this item are added to the sorting criteria list
  await newDataProfilePage.verifyItemAddedToCriteriaList(newDataProfile.shortFields[0]);

  // Click on "Field" dropped down menu
  // Select another item
  // Click on "Add Level" button
  await newDataProfilePage.addSortField(newDataProfile.shortFields[1]);

  // Check this item are added to the sorting criteria list
  await newDataProfilePage.verifyItemAddedToCriteriaList(newDataProfile.shortFields[1]);
});
