/// <reference types="cypress"/>

describe('My Seventh Test suite', () => {

    it('Child Windows Handling by extracting href attribute', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#opentab').then(function (el) { //to handle 'promise' we usen then() as '.prop' is not direct cypress command
           const url = el.prop('href')  //we use 'prop' jQuery to get the property value of that attribute

           cy.visit(url)  //we are visiting 'https://www.qaclickacademy.com/'

        //    cy.url().should('include','qaclickacademy.com')   //assertion of 'url' whether landed on correct page or not
        })
    })

    it('Switch Window Handling', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#openwindow').click()

        // cy.url().should('include','qaclickacademy.com')   //assertion of 'url' whether landed on correct page or not


    })

})