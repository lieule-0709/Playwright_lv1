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
  private readonly heatMapsLocator: Locator = this.page
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
      expect
        .soft((await this.chartsLocator.allInnerTexts()).map((txt) => txt.replace(/\u00a0/g, " ")))
        .toEqual(presetPanels.charts);
      expect
        .soft((await this.indicatorsLocator.allInnerTexts()).map((txt) => txt.replace(/\u00a0/g, " ")))
        .toEqual(presetPanels.indicators);
      expect
        .soft((await this.reportsLocator.allInnerTexts()).map((txt) => txt.replace(/\u00a0/g, " ")))
        .toEqual(presetPanels.reports);
      expect
        .soft((await this.heatMapsLocator.allInnerTexts()).map((txt) => txt.replace(/\u00a0/g, " ")))
        .toEqual(presetPanels.heatMaps);
    });
  }
}
