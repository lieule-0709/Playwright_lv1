import { test, Page, Locator } from "fixtures/common-fixture";
import DashboardMainPage from "./dashboard-main-page";
import DialogHelper from "support/helpers/dialog-helper";

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

      //Regist a listener to Accept alert
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
}
