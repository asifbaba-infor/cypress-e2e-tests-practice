/// <reference types="cypress" />
describe('First Test Suite', function () {

    it('Visit page search ca and add 2nd item(1 index)', function () {
        //steps
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('input.search-keyword').type('ca')
        cy.get('.product:visible').should('have.length', 4)  //same
        cy.get('div.products').find('div.product').should('have.length', 4) //same
        cy.get('.products').find('.product').eq(1).contains('ADD TO CART').click()
    })

    it('Visit page search ca and add specific item', function () {
        //steps
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('input.search-keyword').type('ca')
        cy.get('.products').find('.product').should('have.length', 4) //same
        cy.get('.products').find('.product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()   //extracts the text
            if (textVeg.includes('Cashews')) {    //giving specific item
                cy.wrap($el).find('button').click()
                // $el.find('button').trigger('click');
            }
        })
    })

    it('Visit page print the logo(cypress is asynchronous) uses then() to handle promoise', function () {
        //steps
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        // const brand=cy.get('.brand')
        // cy.log(brand.text()) // it fails as 'logo.text is not a function'

        //assertion of brand text
        cy.get('.brand').should('have.text', 'GREENKART')

        //this is to print logs
        cy.get('.brand').then(function (brandelement) {
            cy.log(brandelement.text())
        })
        console.log('Asynchronous prints first')
        cy.log('Synchronous prints at last in sync')

    })

    it('Visit page search ca and add specific item using alias', function () {
        //steps
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('input.search-keyword').type('ca')
        cy.get('.products').find('.product').as('ProductLocator')
        cy.get('@ProductLocator').should('have.length', 4) //same
        cy.get('@ProductLocator').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()   //extracts the text
            if (textVeg.includes('Capsicum')) {    //giving specific item
                $el.find('button').trigger('click');
            }
        })
    })

    it('Visit page search ca and add two items and proceed to check out', function () {
        //steps
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('input.search-keyword').type('ca')
        cy.get('.products').find('.product').as('ProductLocator')

        cy.get('@ProductLocator').eq(0).contains('ADD TO CART').click() //adding 1st item 'Cauliflower'

        cy.get('@ProductLocator').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()   //extracts the text
            if (textVeg.includes('Cashews')) {    //giving specific item  adding 'Cashews'
                $el.find('button').trigger('click');
            }
        })

        cy.get('img[alt="Cart"]').click()  //click 'Cart' button
        cy.contains('PROCEED TO CHECKOUT').click()  //clicking 'Proceed' button
        cy.contains('Place Order').click()  //clicking 'Place order' button
    })

})
