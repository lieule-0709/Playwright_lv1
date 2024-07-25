import { test } from "fixtures/common-fixture";
import DashboardMainPage from "pages/dashboard-main-page";
import PanelsPage from "pages/panels-page";
import { DateTimeHelper } from "support/helpers/date-time-helper";

let dashboardMPage: DashboardMainPage;
let panelsPageIns: PanelsPage;
const pageName = DateTimeHelper.getToday();
const panelName = "zbox";

test("Verify that when 'Choose panels' form is expanded all pre-set panels are populated and sorted correctly", async ({
  dashboardMainPage,
  choosePanelsPage,
  newPageForm,
  newPanelForm,
  panelsPage,
}) => {
  dashboardMPage = dashboardMainPage;
  panelsPageIns = panelsPage;

  // Navigate to Dashboard login page
  // Login with valid account
  // Go to Global Setting -> Add page
  await dashboardMainPage.selectSetting("Add Page");

  // Enter page name to Page Name field.
  // Click OK button
  await newPageForm.create({ pageName: pageName, public: true });

  // Go to Global Setting -> Create Panel
  await dashboardMainPage.selectSetting("Create Panel");

  // Enter Panel name into Display Name textbox
  // Select any value in Series* dropdown list
  // Click Ok button
  // Click Ok button in Panel Configuration popup
  await newPanelForm.create({ displayName: panelName, series: "location" });

  // Click on Choose Panel menu icon next to Global Setting icon
  await dashboardMainPage.expandChoosePanels();
  await choosePanelsPage.presetPanelsDisplay();
});

test.afterEach("Delete page", async () => {
  await dashboardMPage.selectMenu(pageName);
  await dashboardMPage.deletePageAndVerifyDialogMessage();
  await panelsPageIns.deleteAllPanels();
});
