/// <reference types="cypress"/>

describe('My Fourth Test suite', () =>

    it('Child Tab Handling', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //Cypress cant navigate to child window diretly
        //we are modifying DOM by removing 'target="_blank"' So that it opens the page in same tab(parent window)
        //By invoke jQuery 'removeAttr' we will remove 'target' 

        cy.get('#opentab').invoke('removeAttr', 'target').click()  //opens the page in same tab


        //different origins 'rahulshettyacademy','qaclickacademy' causing the test to "FAIL"


        //by this we can switch origins and wrap any actions inside this block itself
        cy.origin("https://www.qaclickacademy.com", () => {
            cy.url().should('include', 'qaclickacademy.com')   //assertion of 'url' whether landed on correct page or not
            cy.contains('About us').click() //clicking the element inside that page
            cy.get('.mt-50 h2').should('have.text', 'Welcome to QAClick Academy ') //Text validation after navigation
            cy.get('.about-cont p').should('contain', 'online software testing academy')
        })
    })
)