export default class CommonHelper {
  static async delay(miliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
  }
}
