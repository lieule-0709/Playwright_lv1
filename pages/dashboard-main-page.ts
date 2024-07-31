import { Locator, Page, expect, test } from "fixtures/common-fixture";
import LocatorHelper from "support/helpers/locator-helper";

export default class DashboardMainPage {
  private readonly menuLocator: Locator = this.page.locator("#main-menu");
  private readonly headMenuLocator: Locator = this.page.locator("#header");
  private readonly choosePanelsLocator: Locator = this.page.locator(".mn-panels");
  private readonly settingLocator: Locator = this.menuLocator.locator(".mn-setting");
  private readonly deleteLnk: Locator = this.settingLocator.locator("a.delete");
  constructor(private readonly page: Page) {}

  async verifyDisplays(): Promise<void> {
    await test.step("Verify dashboard main page displays", async () => {
      await expect(this.menuLocator.locator("li.active a.active")).toHaveText("Execution Dashboard");
    });
  }

  async expandChoosePanels(): Promise<void> {
    await test.step("Expand Choose Panels form", async () => {
      await this.choosePanelsLocator.click();
    });
  }

  async openDataProfilesPage(): Promise<void> {
    await test.step("Select Administer -> Data Profiles", async () => {
      await this.selectHeadMenu("Administer -> Data Profiles");
    });
  }

  async selectSetting(action: string): Promise<void> {
    await test.step("Select action in setting", async () => {
      await this.settingLocator.hover();
      await this.settingLocator.getByText(action).click();
    });
  }

  async verifySettingButtonNotClickable(): Promise<void> {
    await test.step("Verify Add New link is not clickable", async () => {
      expect(await LocatorHelper.isClickable(this.settingLocator)).toBe(false);
    });
  }

  async deletePageWhichHasChildAndVerifyDialogMessage(messages: Array<string>): Promise<void> {
    await test.step("Delete page which has child page and verify dialog messages", async () => {
      this.page.once("dialog", async (dialog) => {
        expect.soft(dialog.message().trim()).toEqual(messages.at(0));
        await dialog.accept();
        this.page.once("dialog", async (dialog) => {
          expect.soft(dialog.message().trim()).toEqual(messages.at(1));
          await dialog.accept();
        });
      });

      await this.deletePage();
    });
  }

  async deletePageAndVerifyDialogMessage(message?: string): Promise<void> {
    await test.step("Delete page then verify dialog messages", async () => {
      this.page.once("dialog", async (dialog) => {
        message && expect.soft(dialog.message().trim()).toEqual(message);
        await dialog.accept();
      });

      await this.deletePage();
    });
  }

  async deletePage(): Promise<void> {
    await this.settingLocator.hover();
    await this.deleteLnk.click();
  }

  async selectMenu(levelItem: string): Promise<void> {
    const menuItems: Array<string> = levelItem.split("->").map((s) => s.trim());
    if (menuItems.length > 5) {
      throw new Error("Too many nested pages");
    }

    if (menuItems.length == 1) {
      await this.menuLocator.getByText(menuItems[0], { exact: true }).click();
      return;
    }

    for (let i = 0; i < menuItems.length - 1; i++) {
      await this.menuLocator.getByText(menuItems[i], { exact: true }).hover();
    }

    await this.menuLocator.getByText(menuItems[menuItems.length - 1], { exact: true }).click();
  }

  async selectHeadMenu(levelItem: string): Promise<void> {
    const menuItems: Array<string> = levelItem.split("->").map((s) => s.trim());

    if (menuItems.length > 5) {
      throw new Error("Too many nested pages");
    }

    if (menuItems.length == 1) {
      await this.headMenuLocator.getByText(menuItems[0], { exact: true }).click();
      return;
    }

    for (let i = 0; i < menuItems.length - 1; i++) {
      await this.headMenuLocator.getByText(menuItems[i], { exact: true }).hover();
    }

    await this.headMenuLocator.getByText(menuItems[menuItems.length - 1], { exact: true }).click();
  }

  async verifyPageVisible(pageName: string): Promise<void> {
    await test.step(`Verify that page: ${pageName} is visible`, async () => {
      const pages: Array<string> = pageName.split("->").map((s) => s.trim());

      if (pages.length == 1) {
        await test.expect.soft(this.menuLocator.getByText(pageName, { exact: true })).toBeVisible();
        return;
      }

      let page: Locator = this.menuLocator.getByText(pages[0], { exact: true });
      for (let i = 0; i < pages.length; i++) {
        await page.hover();
        page = page.getByText(pages[i], { exact: true });
      }
      await test.expect(page).toBeVisible();

    });
  }

  async verifyPageDeleted(pageName: string): Promise<void> {
    await test.step(`Verify that page: ${pageName} is deleted`, async () => {
      const pages: Array<string> = pageName.split("->").map((s) => s.trim());

      if (pages.length == 1) {
        await test.expect.soft(this.menuLocator.getByText(pageName, { exact: true })).toHaveCount(0);
        return;
      }

      let page: Locator = this.menuLocator.getByText(pages[0], { exact: true });
      for (let i = 1; i < pages.length; i++) {
        page = page.getByText(pages[i], { exact: true });
      }
      await test.expect.soft(page).toHaveCount(0);
    });
  }

  async verifyDeleteLnkDisappear(): Promise<void> {
    await test.step("Verify that delete link is disappear", async () => {
      await test.expect(this.deleteLnk).toHaveCount(0);
    });
  }  
}
