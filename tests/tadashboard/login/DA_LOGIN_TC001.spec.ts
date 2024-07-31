import { test } from "fixtures/login-fixture";
import users from "fixtures/data/users.json";

test("Verify that user can login specific repository successfully via Dashboard login page with correct credentials @SmokeTest", async ({
  loginPage,
  dashboardMainPage, account
}) => {
  // Navigate to Dashboard login page
  await loginPage.open();

  // Enter valid username and password
  // Click on "Login" button
  await loginPage.login(account.username, account.password);

  // Verify that Dashboard Main page appears
  await dashboardMainPage.verifyDisplays();
});
