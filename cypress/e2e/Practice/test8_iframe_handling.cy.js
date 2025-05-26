/// <reference types="cypress"/>
/// <reference types="cypress-iframe"/>

import 'cypress-iframe'

describe('My Eigth Test Suite', () => {

    it('Iframe Handling', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.frameLoaded("#courses-iframe")  //'.frameLoaded' used to load all the frames which have id='courses-iframe'

        //switching to 'iframe' then finding elements in iframe and performing the actions
        cy.iframe().find("a[href='mentorship']").eq(0).click()

        // Reload the iframe after navigation
        cy.frameLoaded("#courses-iframe")

        // Add a small wait to ensure iframe content is fully loaded
        cy.wait(2000)

        //to perform operation on iframe, again we need to use 'iframe()' 
        cy.iframe().find("ul").should('have.length', 9);

        //here validating 2 Pricing title['BRONZE','PLATINUM']
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2); //using regex "class*='pricing-title'" to get two titles
    })

})