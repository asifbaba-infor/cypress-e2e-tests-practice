///<reference types="cypress"/>
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

let ProductName
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
            //waiting for .xlsx to get ready before clicking
            cy.wait(2000)

            //assertion of the amount
            cy.get('tr td:nth-child(3) div:nth-child(1)').then(function (element) {
                const amountTxt = element.text() //extracting total amount text [$ 31500 ]
                Price = amountTxt.split(" ") //splitting based on 'spaces'  => ['$.','31500']
                Price = Price[1].trim() //only using '31500' ,'trim()' to remove any additional spaces
                cy.log(Price)   //here we get "31500"  
                expect(Price).to.equal('231500')
            })

            //Manually converted the .csv to .xslx as there is no link in website to generate

            const filePath = 'cypress/downloads/converted_file.xlsx'
            // const result = excelToJson({
            //     source: fs.readFileSync(filePath) //fs.readFileSync return a buffer
            // });

            //if we execute this "fs.readFileSync" on  browser then we get an ERROR
            // (uncaught exception)TypeError: fs.readFileSync is not a function

            //Browser(Engine) - JS code -> Client side Environment (Front End) ==> CYPRESS
            //have no access to read the files, while excution on Browser

            //Node(Engine) - JS code -> Backend End Application/Environment
            //have Access to read the files, while excution via BAckend

            //TO EXECUTE IN BACKEND need to execute via TASK in config.js  (from line 57 to 60) 
            //Task -(Files,DB) -> Config.js, (ExcelToJson)-> cy.task(ExcelToJson)

            cy.task('excelToJsonConverter', filePath).then(function (result) {
                cy.log(result)
                const actualproductNameCSV = result.data[1].C
                const actualPriceCSV = result.data[1].E.toString()
                expect(ProductName).to.equal(actualproductNameCSV)
                expect(Price).to.equal(actualPriceCSV)
            })

            const filePathcsv = 'cypress/downloads/order-invoice_asifbaba.mohammad_copy.csv'
            //another simpler way for validation without using any "result.data[1].C", by using "readFile" verifying the content
            //as it dont work with binary excel we are validating via csv
            cy.readFile(filePathcsv).then(function (text) {
                expect(text).to.include(ProductName)
                expect(text).to.include(Price)
            })

        })

    })
})