///<reference types="cypress"/>
const neatCSV = require('neat-csv')

let ProductName
let OrderID
let Price
describe('JSON Web Tokens (JWT)', () => {

    it('Login with token via loinAPI(custom command) that we created, shop the items and verify the CSV content', async () => {

        //Setting local storage with "token" so we dont need to login with credentials(By passing the login)
        cy.loginAPI().then(function () {
            //here before loading the url we are setting the token , So we can directly login
            cy.visit("https://rahulshettyacademy.com/client", {
                onBeforeLoad: function (window) {
                    //using the token" in cypress environment(cypress.config.js), which was set in the Custom command(loginAPI())
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })

            //Getting ProductName
            cy.get('.card-body b').eq(2).then(function (ele) {
                ProductName = ele.text()
            })

            //clicking Third item, ":last-of-type" selects the last of it type tag
            cy.get('.card-body button:last-of-type').eq(2).click()  //adding "IPHONE" to the cart
            cy.wait(2000)
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

            //getting OrderId
            cy.get('.box .ng-star-inserted td label').then(function (ele) {
                const OrderIDText = ele.text()
                OrderID = OrderIDText.split(" ")
                OrderID = OrderID[2].trim()
                cy.log(OrderID)
            })

            //assertion of the amount
            cy.get('tr td:nth-child(3) div:nth-child(1)').then(function (element) {
                const amountTxt = element.text() //extracting total amount text [$ 31500 ]
                Price = amountTxt.split(" ") //splitting based on 'spaces'  => ['$.','31500']
                Price = Price[1].trim() //only using '31500' ,'trim()' to remove any additional spaces
                cy.log(Price)   //here we get "31500"  
                expect(Price).to.equal('231500')
            })

            //reading the downloaded file and validating data in excel
            cy.readFile('cypress/downloads/order-invoice_asifbaba.mohammad.csv').then(async function (text) {
                const csv = await neatCSV(text)  //"await" used to resolve the promise
                console.log(csv)
                const actualproductNameCSV = csv[0]["Product Name"] //because "Product Name" having space in it, csv[0]["Product Name"] else "csv[0].Product Name"
                const actualOrderIDCSV = csv[0]["Invoice Number"]
                const actualPriceCSV = csv[0]["Product Price"]
                expect(ProductName).to.equal(actualproductNameCSV)
                expect(OrderID).to.equal(actualOrderIDCSV)
                expect(Price).to.equal(actualPriceCSV)
            })

            //Assertion of Text  
            cy.get('.hero-primary').should('have.text', ' Thankyou for the order. ')

        })

    })
})