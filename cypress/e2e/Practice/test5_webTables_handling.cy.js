/// <reference types="cypress"/>

describe('My Fifth Test Suite', () => {

    it('WebTables Handling', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
            const text = $el.text()
            if (text.includes("Selenium Framework")) {  //extracting the "Course"
                cy.get('tr td:nth-child(2)').eq(index).next().then(function (price) {  //'.next()' used to get the immediate element(sibling) which is on same level
                    const PriceText = price.text()
                    expect(PriceText).to.equal('20')
                })
            }

        })
    })
})