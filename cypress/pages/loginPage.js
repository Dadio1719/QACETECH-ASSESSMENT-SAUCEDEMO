import loginPage from "../pages/loginPage";

describe("Login Tests", () => {
  let data;

  before(() => {
    cy.fixture("testData").then((testData) => {
      data = testData;
    });
  });

  it("Verify valid login", () => {
    loginPage.visit(data.url);

    loginPage.enterUsername(data.users.standard.username);
    loginPage.enterPassword(data.users.standard.password);
    loginPage.clickLogin();

    cy.url().should("include", "inventory");
  });

  it("Verify locked user cannot login", () => {
    loginPage.visit(data.url);

    loginPage.enterUsername(data.users.locked.username);
    loginPage.enterPassword(data.users.locked.password);
    loginPage.clickLogin();

    loginPage.verifyError("Sorry, this user has been locked out");
  });

  it("Verify login fails with empty username", () => {
    loginPage.visit(data.url);

    loginPage.enterPassword("secret_sauce");
    loginPage.clickLogin();

    loginPage.verifyError("Username is required");
  });

  it("Verify login fails with empty password", () => {
    loginPage.visit(data.url);

    loginPage.enterUsername("standard_user");
    loginPage.clickLogin();

    loginPage.verifyError("Password is required");
  });

  it("Verify login fails with invalid credentials", () => {
    loginPage.visit(data.url);

    loginPage.enterUsername("wrong_user");
    loginPage.enterPassword("wrong_password");
    loginPage.clickLogin();

    loginPage.verifyError("Username and password do not match");
  });
});
