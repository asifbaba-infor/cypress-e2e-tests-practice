/// <reference types="cypress"/>

describe('My Third Test suite', () =>

    it('Alert Pop Ups', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#alertbtn').click()
        cy.get('#confirmbtn').click()

        //firing browser events (To verify text on alerts)
        cy.on('window:alert', (str) => {

            //assertion using 'mocha' framework
            expect(str).to.eq('Hello , share this practice page and share your knowledge')

        })

        //firing browser events (To verify text on confirm)
        cy.on('window:confirm', (str) => {

            //assertion using 'mocha' framework
            expect(str).to.eq('Hello , Are you sure you want to confirm?')

        })
    })
)