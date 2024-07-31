import { Locator } from "@playwright/test";

export default class LocatorHelper {
  /**
   * Method to verify locator is clickable
   */
  public static async isClickable(locator: Locator): Promise<boolean> {
    return await locator
      .click({
        timeout: 1000,
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
