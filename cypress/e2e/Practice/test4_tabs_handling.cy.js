/// <reference types="cypress"/>

describe('My Fourth Test suite', () =>

    xit('Child Tab Handling', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //Cypress cant navigate to child window diretly
        //we are modifying DOM by removing 'target="_blank"' So that it opens the page in same tab(parent window)
        //By invoke jQuery 'removeAttr' we will remove 'target' 

        cy.get('#opentab').invoke('removeAttr', 'target').click()  //opens the page in same tab


       //different origins 'rahulshettyacademy','qaclickacademy' causing the test to "FAIL"

        cy.url().should('include','qaclickacademy.com')   //assertion of 'url' whether landed on correct page or not

        cy.go('back') //going back to previous page

        cy.go('forward') //coming back to next page from previous page

    })
)