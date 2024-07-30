import { test } from "fixtures/user-based-worker-fixture";
import { DateTimeHelper } from "support/helpers/date-time-helper";

test(
  'Verify that user can remove any main parent page except "Overview" page successfully ' +
    "and the order of pages stays persistent as long as there is not children page under it",
  async ({ dashboardMainPage, newPageForm }) => {
    const parentPageName = DateTimeHelper.getToday();
    const chillPageName = "Child " + DateTimeHelper.getToday();
    const deletePageMsg = "Are you sure you want to remove this page?";

    // Add a new parent page
    await dashboardMainPage.selectSetting("Add Page");
    await newPageForm.create({ pageName: parentPageName });

    // Add a children page of newly added page
    await dashboardMainPage.selectSetting("Add Page");
    await newPageForm.create({ pageName: chillPageName, parentPage: parentPageName });

    // Click on parent page
    await dashboardMainPage.selectMenu(parentPageName);

    // Click "Delete" link
    // Check confirm message "Are you sure you want to remove this page?" appears
    // Click OK button
    // Check warning message "Can not delete page 'Test' since it has children page(s)" appears
    // Click OK button
    const msg = [deletePageMsg, `Cannot delete page '${parentPageName}' since it has child page(s).`];
    await dashboardMainPage.deletePageWhichHasChildAndVerifyDialogMessage(msg);

    // Click on children page
    await dashboardMainPage.selectMenu(`${parentPageName}->${chillPageName}`);

    // Click "Delete" link
    // Check confirm message "Are you sure you want to remove this page?" appears
    // Click OK button
    await dashboardMainPage.deletePageAndVerifyDialogMessage(deletePageMsg);

    // Check children page is deleted
    await dashboardMainPage.verifyPageDeleted(`${parentPageName}->${chillPageName}`);

    // Click on parent page
    await dashboardMainPage.selectMenu(parentPageName);

    // Click "Delete" link
    // Check confirm message "Are you sure you want to remove this page?" appears
    // Click OK button
    await dashboardMainPage.deletePageAndVerifyDialogMessage(deletePageMsg);

    // Check parent page is deleted
    await dashboardMainPage.verifyPageDeleted(parentPageName);

    // Click on "Overview" page
    await dashboardMainPage.selectMenu("Overview");

    // Check "Delete" link disappears
    await dashboardMainPage.verifyDeleleLnkDisapear();
  },
);
