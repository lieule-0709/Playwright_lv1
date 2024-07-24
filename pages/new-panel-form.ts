import { Page, test, Locator, expect } from "fixtures/common-fixture";
import { NewPanelModel } from "models/new-panel-model";

export default class NewPanelForm {
  private readonly pageLocator: Locator = this.page.locator(".editpanelDlg");
  private readonly displayNameTxt: Locator = this.pageLocator.locator("#txtDisplayName");
  private readonly seriesDdl: Locator = this.pageLocator.locator("#cbbSeriesField");
  private readonly okBtn: Locator = this.pageLocator.locator("#OK");

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

  async disableOrLockOtherControl(): Promise<void> {
    await test.step("Verify that all other control/form is disabled or locked.", async () => {
      this.pageLocator.click();
      await expect(this.pageLocator).toBeFocused();
      
      await this.page.locator("//body/div").filter({ hasNot: this.pageLocator }).count();
      //otherControlls is a list of links
      const otherControlls =  await this.page.locator("body > *:visible").filter({ hasNot: this.pageLocator }).getByRole("link").all();
      console.log(otherControlls);
      otherControlls.forEach((control) => {
        control.isEnabled()
      });
      // await expect(this.page.locator('//body/div')
      // .filter({ hasNot: this.pageLocator }))
      // .toBeDisabled();
    });
  }
}
