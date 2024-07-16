import { Page, expect, test } from "fixtures/user-based-worker-fixture";

export default class DashboardMainPage {
  private readonly menuLocator = this.page.locator("#main-menu");
  private readonly settingLocator = this.menuLocator.locator(".mn-setting");
  private readonly deleteLnk = this.settingLocator.locator("a.delete");

  constructor(private readonly page: Page) {}

  async displays(): Promise<void> {
    await test.step("Verify dashboard main page displays", async () => {
      await expect(this.menuLocator.locator("li.active a.active")).toHaveText("Execution Dashboard");
    });
  }

  async selectSetting(action: string): Promise<void> {
    await test.step("Select action in setting", async () => {
      await this.settingLocator.hover();
      await this.settingLocator.getByText(action).click();
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
}
