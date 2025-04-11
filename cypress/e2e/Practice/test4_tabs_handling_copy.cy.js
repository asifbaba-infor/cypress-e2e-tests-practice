/// <reference types="cypress"/>

describe('My Fourth Test suite', () =>

    it('Child Tab Handling', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')

        //Cypress cant navigate to child window diretly
        //we are modifying DOM by removing 'target="_blank"' So that it opens the page in same tab(parent window)
        //By invoke jQuery 'removeAttr' we will remove 'target' 

        cy.get('a[href="/windows/new"]').invoke('removeAttr', 'target').click()  //opens the page in same tab

        cy.url().should('include','herokuapp.com')   //assertion of 'url' whether landed on correct page or not

        cy.go('back') //going back to previous page

        cy.go('forward') //coming back to next page from previous page

    })
)