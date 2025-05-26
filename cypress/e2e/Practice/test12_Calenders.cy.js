/// <reference types="cypress"/>
describe('Calenders in Cypress Automation', () => {

    it('Calender Test in Web( one way--Hardcoding)', function () {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')
        cy.get('svg[class*="react-date-picker__calendar"]').click()
        cy.get('span[class*="react-calendar"]').click()
        cy.get('span[class*="react-calendar"]').click()
        cy.get('button[class*="react-calendar__tile"]').contains('2030').click()
        cy.get('button[type="button"]').contains('September').click()
        cy.get('[aria-label="September 26, 2030"]').click()

    })

    it('Verify Date Selection( Another way )', () => {

        const monthNumber = '9'//September
        const date = '26'
        const year = '2030'
        const expectedList = [monthNumber, date, year]

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const monthName = monthNames[Number(monthNumber) - 1]

        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')
        cy.get('.react-date-picker__inputGroup').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.get('button[class*="decade-view"]').contains(year).click()
        cy.get('.react-calendar__year-view__months__month').eq(Number(monthNumber) - 1).click()   //As indexing starts from 0
        
        cy.get(`[aria-label="${monthName} ${date}, ${year}"]`).click()

        //Assertion of Date selected
        cy.get('.react-date-picker__inputGroup__input').each(($el, index) => {
            
            cy.wrap($el).invoke('val').should('eq', expectedList[index])
        })
    })

})