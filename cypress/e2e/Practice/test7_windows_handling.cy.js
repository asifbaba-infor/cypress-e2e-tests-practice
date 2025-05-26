/// <reference types="cypress"/>

describe('My Seventh Test suite', () => {

    it('Child Windows Handling by extracting href attribute', () => {
        cy.visit(Cypress.env('Base_URL') + "/AutomationPractice/")

        cy.get('#opentab').then(function (el) { //to handle 'promise' we usen then() as '.prop' is not direct cypress command
            const url = el.prop('href')  //we use 'prop' jQuery to get the property value of that attribute

            cy.visit(url)  //we are visiting 'https://www.qaclickacademy.com/' 

            cy.origin(url, () => {  //we are passing 'url' as parameter to 'cy.origin'
                cy.url().should('include', 'qaclickacademy.com')   //assertion of 'url' whether landed on correct page or not
                cy.contains('Contact').click()
                cy.get('.cont p').eq(1).should('have.text', 'Siri Balaji Residency, Road no 2, GaddiAnnaram, Hyderabad, India.')
            })
        })
    })

    it('Switch Window Handling', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#openwindow').click()

        cy.visit('https://www.qaclickacademy.com/')
        cy.origin('https://www.qaclickacademy.com/', () => {  //we are passing 'url' as parameter to 'cy.origin'
            cy.url().should('include', 'qaclickacademy.com')   //assertion of 'url' whether landed on correct page or not
            cy.contains('Blog').click()
            cy.get('h1.alignwide').should('contain.text', 'a blog about philosophy')

        })

        // cy.url().should('include','qaclickacademy.com')   //assertion of 'url' whether landed on correct page or not


    })

})