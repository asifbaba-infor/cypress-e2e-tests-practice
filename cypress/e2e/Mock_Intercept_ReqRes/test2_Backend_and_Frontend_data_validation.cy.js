describe('Mocking Http Request to validate the Frontend and Backend data', () => {

    it('First Tc : Validation of response data and The Data shown in th UI', () => {

        //First: we are visiting the page
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        //Second:  we need to intercept the response

        //cy.intercept({request body},{response body})
        //here we are intercepting the response and giving our desired response in the response body {"Here giving 3 data"}
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
                },
                {
                    "book_name": "Learn Appium Automation with Java",
                    "isbn": "lkjh",
                    "aisle": "1134"
                },
                {
                    "book_name": "Learning Rest Assured",
                    "isbn": "ISBNSudhir",
                    "aisle": "2007"
                }
            ]
        }).as('bookretrievals')

        //Third: we are performing our Automation based on the mocked Response data here

        cy.contains('button', 'Virtual Library').click()

        //Fourth: waiting until the response is intercepted (here we are resolving Promise to get access on Response body for validation)
        //Assertion for length of the response array = rows of the table in UI
        cy.wait('@bookretrievals').then(({ request, response }) => {

            //here [response.body.length=3] , and we are getting the <tr> for the table data {we get "4" including with header}
            //so Asserting 'have.length' [returns "4"] to [response.body.length + 1=4]
            cy.get('tr').should('have.length', response.body.length + 1)
        })


    })
})