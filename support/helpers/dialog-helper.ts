import { Page } from "@playwright/test";

export default class DialogHelper {
  /**
   * Regist listenter to accept an alert
   */
  public static accept(page: Page) {
    page.on("dialog", async (alert) => {
      await alert.accept();
    });
  }
}
