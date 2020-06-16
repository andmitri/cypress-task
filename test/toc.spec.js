/// <reference types="Cypress" />

//Test suite is performing checking of TOC menu appearance.
describe('TOC tree test', () => {
    beforeEach(() => {
        cy.visit('https://www.jetbrains.com/help/idea/installation-guide.html');
    });

    it('test TOC menu is visible in default width', () => {
    cy.get('[data-test=toc]').should('be.visible');
    });

    it('test TOC menu is collapsed in small width', () => {
    cy.viewport(550, 750);
    cy.get('[data-test=toc]').should('not.be.visible');
    cy.get('[data-test=icon-hamburger]').should('be.visible');
    });

    it('test TOC menu is shown and collapsed on click', () => {
    cy.viewport(550, 750);
    cy.get('[data-test=icon-hamburger]').click();
    cy.get('[data-test=toc]').should('be.visible');
    cy.get('[data-test=icon-close]').click();
    cy.get('[data-test=icon-close]').should('not.be.visible');
    });
});
