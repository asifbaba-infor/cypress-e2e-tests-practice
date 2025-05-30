describe('Mocking Http Response with Cypress', () => {

    it('First Tc : Mocking Response to get only single data', () => {

        //First: we are visiting the page
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        //Second:  we need to intercept the response

        //cy.intercept({request body},{response body})
        //here we are intercepting the response and giving our desired response in the response body {"Here giving only One data"}
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        }, {
            statusCode: 200,
            body: [
                {
                    "book_name": "RestAssured with Java",
                    "isbn": "LSA",
                    "aisle": "2303"
                }
            ]
        }).as('bookretrievals')

        //Third: we are performing our Automation based on the mocked Response data here

        cy.contains('button', 'Virtual Library').click()

        //Fourth: waiting until the response is intercepted
        cy.wait('@bookretrievals')
        
        //Assertion wheteher we only got one response after intercepting the response body
        cy.get('p').should('have.length', 1).and('contain.text', 'Oops only 1 Book available')


    })
})