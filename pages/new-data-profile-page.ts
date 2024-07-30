import { Page, test, Locator } from "fixtures/user-based-worker-fixture";
import { NewDataProfileModel } from "models/new-data-profile-model";

export default class NewDataProfilePage {
  private readonly pageMenuLocator: Locator = this.page.locator("#wstep");
  private readonly sortFields: Locator = this.pageMenuLocator.getByText("Sort Fields");
  private readonly profileSettingsDetailLocator: Locator = this.page.locator("#profilesettingsdetail");
  private readonly nameTxt: Locator = this.profileSettingsDetailLocator.locator("#txtProfileName");
  private readonly fieldsDdl: Locator = this.page.locator("#cbbFields");
  private readonly addLevelBtn: Locator = this.page.getByRole("button", { name: "Add Level" });
  private readonly sortFieldCriteriasLbl: Locator = this.page.locator(".sortFieldName");
  private readonly nextBtn: Locator = this.profileSettingsDetailLocator.getByRole("button", { name: "Next" });
  constructor(private readonly page: Page) {}

  async enterGeneralSetting(data: NewDataProfileModel): Promise<void> {
    await test.step("Create new data profile", async () => {
      await this.nameTxt.fill(data.name);
      await this.nextBtn.click();
    });
  }

  async addSortField(field: string): Promise<void> {
    await test.step(`Add ${field} to sort field`, async () => {
      await this.sortFields.click();
      await this.fieldsDdl.selectOption(field);
      await this.addLevelBtn.click();
    });
  }

  async verifyItemAddedToCriteriaList(field: string): Promise<void> {
    await test.step(`Verify that field: ${field} is added to sorting criteria list`, async () => {
      const sortFieldCriterias = await this.sortFieldCriteriasLbl.allInnerTexts();
      test.expect(sortFieldCriterias).toContain(field);
    });
  }
}
