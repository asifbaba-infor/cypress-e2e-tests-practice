/// <reference types="cypress"/>

describe('Hooks in Framework', function () {

    beforeEach(function () {
        cy.fixture('Practice/test10_CustomCommands_Framework_Data').then(function (data) {
            this.data = data
        })
    })

    it('First Tc: Click on "Shop" and add items to cart based on text provided to Custom commands', function () {

        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.contains('Shop').click()

        cy.selectProduct('Blackberry') //created 'selectProduct' custom command which adds to cart based on "text" provided
        cy.selectProduct('iphone X')
        cy.selectProduct('Nokia Edge')
    })


    it('Second Tc: Add items to cart based on Parameterized data[array] from "fixtures" provided to Custom commands', function () {

        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.contains('Shop').click()

        const ProductArray = this.data.productNames;

        ProductArray.forEach((element) => {
            cy.selectProduct(element);
        });

    })

    it('Third Tc: selection of Product based on filter()', () => {
        
        const productName = "Blackberry"
        cy.visit('https://rahulshettyacademy.com/angularpractice/shop')

        cy.get('app-card').should('have.length', 4) //get all four products based on tag name

        //one way (directly)
        cy.get('app-card').filter(':contains("Nokia Edge")').contains('Add').click() //filtering based on text(using "JQuery" :contains) and adding to cart

        //second way (by resolving promise)
        cy.get('app-card').filter(`:contains("${productName}")`).then($element => {
            cy.wrap($element).should('have.length', 1)
            cy.wrap($element).contains('button', 'Add').click() //to be more specific the type is button
        })

        //third way (by using 'eq')
        cy.get('app-card').eq(0).contains('Add').click()  //Adds "iphone X"

        //checking out to cart
        cy.contains('a', 'Checkout').click()

        let sum = 0
        //extracting Prices of the products and doing Assertion
        cy.get('tr td:nth-child(4) strong').each(($el) => {
            // const priceText = $el.text()
            // var amount = priceText.split(" ")
            // amount = amount[1].trim()

            // ₹. 65000, ₹. 50000, ₹. 100000
            const amount = Number($el.text().split(" ")[1].trim())

            cy.log(amount)
            // 65000,50000,100000

            sum = Number(sum) + Number(amount)
            // 65000+50000+100000 = 215000
        }).then(() => {
            cy.log(sum)
            //215000
            expect(sum).to.be.lessThan(220000)
        })

        //checking out to cart button 
        cy.contains('button', 'Checkout').click()

        Cypress.config('defaultCommandTimeout', 10000) //waits timeout '10' sec only for this case(from this step only)

        cy.get('input#country').type('India')
        cy.get('.suggestions > ul > li > a').click()
        // cy.wait(3000)
        cy.get('#checkbox2').check({ force: true })
        cy.get('[value="Purchase"]').click()
        cy.get('.alert').then(function (element) {
            const actualText = element.text()
            expect(actualText.includes("Success"))
        })
    })

})