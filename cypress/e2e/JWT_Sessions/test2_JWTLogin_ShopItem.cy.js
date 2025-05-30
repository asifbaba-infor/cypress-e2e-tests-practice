describe('JSON Web Tokens (JWT)', () => {

    it('Login with token via loinAPI(custom command) that we created and shop the items', () => {

        //Setting local storage with "token" so we dont need to login with credentials(By passing the login)
        cy.loginAPI().then(function () {
            //here before loading the url we are setting the token , So we can directly login
            cy.visit("https://rahulshettyacademy.com/client", {
                onBeforeLoad: function (window) {
                    //using the token" in cypress environment(cypress.config.js), which was set in the Custom command(loginAPI())
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })

            //clicking second item, ":last-of-type" selects the last of it type tag
            cy.get('.card-body button:last-of-type').eq(1).click()
            //going to Cart
            cy.get("[routerlink*='cart']").click()
            //clicking Checkout
            cy.contains('Checkout').click()
            //typing "ind" in country field
            cy.get("[placeholder*='Country']").type('ind')
            //Selcting "India" by traversing from the results
            cy.get('.ta-results button').each(($el, index, $list) => {
                if ($el.text() === " India") {
                    cy.wrap($el).click()
                }
            })
            //placing order
            cy.get(".action__submit").click()
            //waiting for .csv to get ready before clicking
            cy.wait(2000)
            //downloading order details in form of excel
            cy.get('.order-summary button').click() //the downloads will be stored in "cypress/downloads" folder
            //Assertion of Text
            cy.get('.hero-primary').should('have.text', ' Thankyou for the order. ')

            //assertion of the amount
            cy.get('tr td:nth-child(3) div:nth-child(1)').then(function (element) {
                const amountTxt = element.text() //extracting total amount text [$ 31500 ]
                var amount = amountTxt.split(" ") //splitting based on 'spaces'  => ['$.','31500']

                amount = amount[1].trim() //only using '31500' ,'trim()' to remove any additional spaces
                cy.log(amount)   //here we get "31500"  
                expect(amount).to.equal('31500')
            })

        })

    })
})