import { test, Page, Locator, expect } from "fixtures/common-fixture";
import DashboardMainPage from "./dashboard-main-page";
import DialogHelper from "support/helpers/dialog-helper";
import LocatorHelper from "support/helpers/locator-helper";

export default class PanelsPage {
  private readonly checkAllLnk: Locator = this.page.getByRole("link", { name: "Check All", exact: true });
  private readonly deleteMultiLnk: Locator = this.page.locator(".panel_tag2 > a", { hasText: "Delete" });
  private readonly addNewLnk: Locator = this.page.getByRole("link", { name: "Add New", exact: true });

  constructor(private readonly page: Page) {}

  async deleteAllPanels(): Promise<void> {
    //Select Administer -> Panels
    const dashboardMainPage = new DashboardMainPage(this.page);
    await dashboardMainPage.selectHeadMenu("Administer -> Panels");

    // Check all and delete
    await test.step("Delete all panels", async () => {
      await this.checkAllLnk.click();

      //Regis a listener to Accept alert
      DialogHelper.accept(this.page);

      //Click delete multi link
      await this.deleteMultiLnk.click();
    });
  }

  async clickAddNew(): Promise<void> {
    await test.step("Click on Add New link", async () => {
      await this.addNewLnk.click();
    });
  }

  async verifyAddNewLinkNotClickable(): Promise<void> {
    await test.step("Verify Add New link is not clickable", async () => {
      expect(await LocatorHelper.isClickable(this.addNewLnk)).toBe(false);
    });
  }
}
