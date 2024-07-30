import { Panels } from "models/panels-model";
import { expect, test, Page, Locator } from "fixtures/common-fixture";
import presetPanels from "fixtures/data/presetPanels.json";

export default class ChoosePanelsPage {
  private readonly createNewPanelBtn: Locator = this.page.locator(
    "//div[@class='cpbutton']/span[contains(text(), 'Create new panel')]",
  );
  private readonly chartsLocator: Locator = this.page
    .locator(".pitem", { has: this.page.locator(".pchart") })
    .getByRole("link");
  private readonly indicatorsLocator: Locator = this.page
    .locator(".pitem", { has: this.page.locator(".pindicator") })
    .getByRole("link");
  private readonly reportsLocator: Locator = this.page
    .locator(".pitem", { has: this.page.getByText("Reports", { exact: true }) })
    .getByRole("link");
  private readonly heatmapsLocator: Locator = this.page
    .locator(".pitem", { has: this.page.getByText("Heat Maps", { exact: true }) })
    .getByRole("link");

  constructor(private readonly page: Page) {}

  async clickAddPanel(): Promise<void> {
    await test.step("Click on 'Create new panel' button", async () => {
      await this.createNewPanelBtn.click();
    });
  }

  async verifyPresetPanelsDisplay(): Promise<void> {
    await test.step("Verify all pre-set panels are populated and sorted correctly", async () => {
      const allPanels: Panels = { Charts: [], Indicators: [], Reports: [], "Heat Maps": [] };

      allPanels.Charts = (await this.chartsLocator.allInnerTexts()).map((txt) => txt.replace(/\u00a0/g, " "));
      allPanels.Indicators = (await this.indicatorsLocator.allInnerTexts()).map((txt) => txt.replace(/\u00a0/g, " "));
      allPanels.Reports = (await this.reportsLocator.allInnerTexts()).map((txt) => txt.replace(/\u00a0/g, " "));
      allPanels["Heat Maps"] = (await this.heatmapsLocator.allInnerTexts()).map((txt) => txt.replace(/\u00a0/g, " "));

      expect(allPanels).toEqual(presetPanels);
    });
  }
}
