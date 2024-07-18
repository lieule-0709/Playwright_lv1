import { test } from "fixtures/common-fixture";
import presetPanels from "fixtures/data/presetPanels.json";

test("Verify that when 'Choose panels' form is expanded all pre-set panels are populated and sorted correctly", async ({
  dashboardMainPage,
  newPageForm,
  choosePanelsPage
}) => {

  await dashboardMainPage.expandChoosePanels();
  await choosePanelsPage.presetPanelsDisplay();
});

