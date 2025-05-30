describe('Mocking Http Request with Cypress', () => {

    it('First Tc : Mocking Request to provide dummy url', () => {

        //First: we are visiting the page
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        //Second:  we need to intercept the response

        //cy.intercept(method,url,routeHandler)
        //here we are intercepting the request and giving our desired Request
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {

            //here we are modifying the request
            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=asifbaba'

            //here we are resolving the Promise and continuing to pass the provided 'dummy url'
            req.continue((res) => {
                //here we are asserting the response status code( "404" no records for the dummy url)
                expect(res.statusCode).to.equal(404)
            })
        }).as('dummyUrl')

        //here we are performing our Automation based on the mocked Request data here
        //we get the request url only when this button is clicked, and we can use the Mocked request from above
        cy.contains('button', 'Virtual Library').click()
        cy.wait('@dummyUrl')

    })
})