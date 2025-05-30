describe('API Automation(completely Backend)', () => {

    it('First Tc: Automation of API without any interaction with web', () => {
        // Generate a random aisle number to make the request unique each time
        const randomAisle = Math.floor(Math.random() * 1000000).toString();
        const isbn = "cypress";
        const bookId = isbn + randomAisle;

        //cy.request('method',url,body)
        //here we are making a request to the API and getting the response
        cy.request('POST', 'https://216.10.245.166/Library/Addbook.php', {
            "name": "Cypress API Automation",
            "isbn": isbn,
            "aisle": randomAisle,
            "author": "Asif"
        }).then((response) => {
            //here we are asserting the response status code
            expect(response.status).to.equal(200)
            //here we are asserting the response body
            expect(response.body).to.have.property('Msg', 'successfully added')
            //here we are asserting the response body
            expect(response.body).to.have.property('ID', bookId)
        })

    });
});