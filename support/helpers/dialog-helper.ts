import { Page } from "@playwright/test";

export default class DialogHelper {
  /**
   * Regis listener to accept an alert
   */
  public static accept(page: Page) {
    page.on("dialog", async (alert) => {
      await alert.accept();
    });
  }
}
