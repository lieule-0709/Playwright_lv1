import { Page, test, Locator } from "fixtures/common-fixture";
import { NewPageModel } from "models/new-page-model";

export default class NewPageForm {
  private readonly pageLocator: Locator = this.page.locator("#div_popup");
  private readonly pageNameTxt: Locator = this.pageLocator.locator("#name");
  private readonly parentPageCbx: Locator = this.pageLocator.locator("#parent");
  private readonly okBtn: Locator = this.pageLocator.locator("#OK");
  private readonly publicChk: Locator = this.page.locator("#ispublic");

  constructor(private readonly page: Page) {}

  async create(data: NewPageModel): Promise<void> {
    await test.step("Create new page", async () => {
      data.pageName && (await this.pageNameTxt.fill(data.pageName));
      data.parentPage && (await this.parentPageCbx.selectOption(data.parentPage));
      data.public && (data.public === true ? await this.publicChk.check() : await this.publicChk.uncheck());

      await this.okBtn.click();
    });
  }
}
