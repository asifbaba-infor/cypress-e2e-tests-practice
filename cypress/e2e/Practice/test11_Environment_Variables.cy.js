/// <reference types="cypress"/>

describe('Hooks in Framework', function () {

    beforeEach(function () {
        cy.fixture('Practice/test10_CustomCommands_Framework_Data').then(function (data) {
            this.data = data
        })
    })

    it('First Tc: Click on "Shop" and add items to cart based on text provided to Custom commands', function () {

        // cy.visit(Cypress.env('URL_Angular')) //passing the url through environment variable to use globally

        cy.visit(Cypress.env('Base_URL')+'/angularpractice/') //base url and concating sub domain

        cy.contains('Shop').click()

        cy.selectProduct('Blackberry') //created 'selectProduct' custom command which adds to cart based on "text" provided
        cy.selectProduct('iphone X')
        cy.selectProduct('Nokia Edge')
    })


    it('Second Tc: Add items to cart based on Parameterized data[array] from "fixtures" provided to Custom commands', function () {

        cy.visit(Cypress.env('URL_Angular')) //passing the url through environment variable to use globally
        cy.contains('Shop').click()

        const ProductArray = this.data.productNames;

        ProductArray.forEach((element) => {
            cy.selectProduct(element);
        });

    })

})