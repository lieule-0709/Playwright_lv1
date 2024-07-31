import { Locator } from "@playwright/test";

export default class LocatorHelper {
  /**
   * Method to verify locator is clickable
   */
  public static async isClickable(locator: Locator) : Promise<boolean>{
    try {
      await locator.click();
    } catch (e) {
      return false;
    }
    return true;
  }
}
