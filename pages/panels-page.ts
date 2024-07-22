import { expect, test, Page, Locator} from "fixtures/common-fixture";

export default class PanelsPage {
    private readonly checkAllLnk: Locator = this.page.locator("link", { hasText: 'Check All'});
    private readonly deleteMultiLnk: Locator = this.page.locator(".panel_tag2 > a", { hasText: 'Delete'});

    constructor(private readonly page: Page) {}

    async deleteAllPanels(): Promise<void>{
      await test.step("Delete all panels", async()=>{
        await this.checkAllLnk.click();
        await this.deleteMultiLnk.click();

        //Accept alert to confirm delete
        this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
          });
      })
    }
}
  