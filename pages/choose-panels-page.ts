import { expect, test, Page, Locator } from "fixtures/common-fixture";
import presetPanels from "fixtures/data/presetPanels.json";

export default class ChoosePanelsPage {
  private readonly panelsLocator: Locator = this.page.locator(".pitem > .ptit");
  private readonly createNewPanelBtn: Locator = this.page.locator(
    "//div[@class='cpbutton']/span[contains(text(), 'Create new panel')]",
  );

  constructor(private readonly page: Page) {}

  async clickAddPanel(): Promise<void> {
    await test.step("Click on 'Create new panel' button", async () => {
      await this.createNewPanelBtn.click();
    });
  }

  async presetPanelsDisplay(): Promise<void> {
    await test.step("Verify all pre-set panels are populated and sorted correctly", async () => {
      const panels = await this.panelsLocator.allInnerTexts();
      expect(panels).toEqual(presetPanels);
    });
  }
}
