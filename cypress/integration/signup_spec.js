import "cypress-react-selector";

describe("sign up tests", () => {
    before(() => {
        cy.visit("/");
        cy.waitForReact();
    });

    it("should transit to create account page", () => {
        cy.get("img").should("be.visible");
    });
});