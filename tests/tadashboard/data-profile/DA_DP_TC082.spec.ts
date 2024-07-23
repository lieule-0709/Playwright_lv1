import { test } from "fixtures/common-fixture";
import { NewDataProfileModel } from "models/new-data-profile-model";
import { DateTimeHelper } from "support/helpers/date-time-helper";

const profileName = "Profile-" + DateTimeHelper.getToday();
let newDataProfile: NewDataProfileModel;
newDataProfile = { name: profileName, shortFileds: ["Name", "Location"] };

test("Verify that user is able to add levels of fields ", async ({
  dashboardMainPage,
  dataProfilesPage,
  newDataProfilePage,
}) => {
  // Log in Dashboard
  // Navigate to Data Profiles page
  await dataProfilesPage.open();

  // Click on "Add New"
  await dataProfilesPage.clickAddNew();

  // Input to "Name *" field
  // Click on Next button
  await newDataProfilePage.enterGeneralSetting(newDataProfile);

  // Navigate to Sort Fields page
  // Click on "Field" dropped down menu
  // Select an item
  // Click on "Add Level" button
  newDataProfile.shortFileds && (await newDataProfilePage.addSortField(newDataProfile.shortFileds[0]));

  // Check this item are added to the sorting criteria list
  newDataProfile.shortFileds && (await newDataProfilePage.itemAddedToCriteriaList(newDataProfile.shortFileds[0]));

  // Click on "Field" dropped down menu
  // Select another item
  // Click on "Add Level" button
  newDataProfile.shortFileds && (await newDataProfilePage.addSortField(newDataProfile.shortFileds[1]));

  // Check this item are added to the sorting criteria list
  newDataProfile.shortFileds && (await newDataProfilePage.itemAddedToCriteriaList(newDataProfile.shortFileds[1]));
});
