import { expect, test, Page, Locator} from "fixtures/common-fixture";
import DashboardMainPage from "./dashboard-main-page";
import presetDataProfiles from 'fixtures/data/presetDataProfiles.json'

export default class DataProfilesPage {
  private readonly dataProfilesRowLocator: Locator = this.page.locator("//form[@id='form1']//tbody/tr/td[2]");
  private readonly presetDataProfileRow: Locator = this.dataProfilesRowLocator.filter({ hasNot: this.page.getByRole('link') });
  private readonly addNewLnk: Locator = this.page.getByRole('link', { name: 'Add New', exact: true });

  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await test.step("Select Administer -> Data Profiles", async() => {
      let dashboardMainPage = new DashboardMainPage(this.page);
      await dashboardMainPage.selectHeadMenu("Administer -> Data Profiles")
    })
  }

  async presetDataProfilePopulated(): Promise<void>{
    // Check all and delete
    await test.step("Verify that Pre-set Data Profile are populated correctly", async()=>{ 
      const rowCount = await this.presetDataProfileRow.count();
      expect(rowCount).toEqual(presetDataProfiles.length);
      
      const prsDataProfiles = await this.presetDataProfileRow.allTextContents();
      for(let i=0; i<rowCount; i++){
        expect(prsDataProfiles[i].replace(/\u00a0/g, " ")).toEqual(presetDataProfiles[i])
      }
    })
  }

  async clickAddNew(): Promise<void> {
    await test.step("Click on Add New link", async () => {
      await this.addNewLnk.click();
    });
  }
}
  