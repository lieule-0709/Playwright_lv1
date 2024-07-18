import { expect, test, Page, Locator} from "fixtures/common-fixture";
import presetPanels from 'fixtures/data/presetPanels.json'

export default class ChoosePanelsPage {
    private readonly panelsLocator: Locator = this.page.locator(".pitem > .ptit");
  

    constructor(private readonly page: Page) {}
  

    async presetPanelsDisplay(): Promise<void> {
        await test.step("Verify all pre-set panels are populated and sorted correctly", async () => {
          const panels = await this.panelsLocator.allTextContents();
          await console.log(panels);
          await console.log(presetPanels);
          await expect(panels).toEqual(presetPanels);
        });
      }
  }
  