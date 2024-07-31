import { Page, test, Locator, expect } from "fixtures/common-fixture";
import { NewPanelModel } from "models/new-panel-model";

export default class NewPanelForm {
  private readonly pageLocator: Locator = this.page.locator(".editpanelDlg");
  private readonly displayNameTxt: Locator = this.pageLocator.locator("#txtDisplayName");
  private readonly seriesDdl: Locator = this.pageLocator.locator("#cbbSeriesField");
  private readonly okBtn: Locator = this.pageLocator.locator("#OK");
  private readonly overlay: Locator = this.page.locator(
    "//div[contains(@class, 'ui-dialog-overlay') and contains(@style, 'z-index: 1001;')]",
  );

  constructor(private readonly page: Page) {}

  async create(data: NewPanelModel): Promise<void> {
    await test.step("Create new panel", async () => {
      data.displayName && (await this.displayNameTxt.fill(data.displayName));
      data.series && (await this.seriesDdl.click(), await this.seriesDdl.selectOption(data.series));
      await this.okBtn.click();
      await expect(this.okBtn).toHaveCount(2);
      await this.okBtn.last().click();
    });
  }

  async verifyOtherControlDisableOrLock(): Promise<void> {
    await test.step("Verify that all other control/form is disabled or locked.", async () => {
      await expect(this.pageLocator).toBeVisible();
      //verify that div overlay which has z-index=1001 is visible, it covers all control except new panel form (z-index=1002)
      await expect(this.overlay).toBeVisible();
    });
  }
}
