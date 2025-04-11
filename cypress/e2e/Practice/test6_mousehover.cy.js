/// <reference types="Cypress" />

describe('My Sixth Test Suite', () => {

    it('Mouse Hovering', () => {

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        // cy.contains('Top').click({ force: true }); // Force the click even if the element is not visible

        cy.get('.mouse-hover-content').invoke('show')  // 'show' is a JQuery method which makes hidden elements visible
        cy.contains('Top').click()  // 'contains' used to find element based on text

        cy.url().should('include', '#top')
    })
})