describe("Add to Cart and Checkout Tests", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");

    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
  });

  it("Verify user can add product to cart", () => {
    cy.get(".inventory_item button").first().click();

    cy.get(".shopping_cart_badge").should("contain", "1");
  });

  it("Verify user can remove product from cart", () => {
    cy.get(".inventory_item button").first().click();

    cy.get(".shopping_cart_link").click();

    cy.contains("Remove").click();

    cy.get(".cart_item").should("not.exist");
  });

  it("Verify successful checkout", () => {
    cy.get(".inventory_item button").first().click();

    cy.get(".shopping_cart_link").click();

    cy.get("#checkout").click();

    cy.get("#first-name").type("Test");
    cy.get("#last-name").type("User");
    cy.get("#postal-code").type("10001");

    cy.get("#continue").click();
    cy.get("#finish").click();

    cy.contains("Thank you for your order");
  });

  /* NEGATIVE TEST CASES */

  it("Verify checkout fails without first name", () => {
    cy.get(".inventory_item button").first().click();

    cy.get(".shopping_cart_link").click();

    cy.get("#checkout").click();

    cy.get("#last-name").type("User");
    cy.get("#postal-code").type("10001");

    cy.get("#continue").click();

    cy.contains("First Name is required");
  });

  it("Verify checkout fails without postal code", () => {
    cy.get(".inventory_item button").first().click();

    cy.get(".shopping_cart_link").click();

    cy.get("#checkout").click();

    cy.get("#first-name").type("Test");
    cy.get("#last-name").type("User");

    cy.get("#continue").click();

    cy.contains("Postal Code is required");
  });
});
