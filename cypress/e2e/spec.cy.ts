describe("template spec", () => {
  it("checks name in home", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-testid="test-name"]')
      .should("exist")
      .should("have.text", "Aqiel Ilhamy");
  });

  it("checks sales table", () => {
    cy.visit("http://localhost:3000/sales");

    cy.get("[data-testid='test-table']").should("exist");

    cy.get("[data-testid='2_name']")
      .should("exist")
      .children("[data-testid='test-table-cell-expand']")
      .click();

    cy.get('[data-testid="test-table-container"]').scrollTo("topLeft");
  });

  it("checks users table", () => {
    cy.visit("http://localhost:3000/users");

    cy.get("[data-testid='test-table']").should("exist");

    cy.get("[data-testid='0_id']")
      .should("exist")
      .children("[data-testid='test-table-cell-expand']")
      .click();

    cy.get('[data-testid="test-table-container"]').scrollTo("topLeft");
  });

  it("checks register user form", () => {
    cy.visit("http://localhost:3000/register");

    cy.get("[data-testid='test-register-form-name']")
      .should("exist")
      .focus()
      .type("testing-name")
      .blur();

    cy.get("[data-testid='test-register-form-email']")
      .should("exist")
      .focus()
      .type("testing@test.com")
      .blur();

    cy.get("[data-testid='test-register-form-submit']").should("exist").click();

    cy.wait(5000);
  });

  it("checks search user", () => {
    cy.visit("http://localhost:3000/search");

    cy.get("[data-testid='test-search-form-email']")
      .should("exist")
      .focus()
      .type("testing@test.com")
      .blur();

    cy.get("[data-testid='test-search-form-submit'").should("exist").click();

    cy.get("[data-testid='test-sidepanel-container'").should("exist");

    cy.get("[data-testid='test-sidepanel-userdetails-id'").should("exist");

    cy.get("[data-testid='test-sidepanel-deletebutton'")
      .should("exist")
      .scrollIntoView()
      .click();

    cy.get("[data-testid='test-modal-container'").should("exist");

    cy.get("[data-testid='test-modal-confirmbutton'").should("exist").click();

    cy.wait(5000);
  });
});
