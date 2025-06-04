describe('Cypress Studio Demo', () => {
    it('create new transaction', () => {
        /* ==== Generated with Cypress Studio ==== */
        //below code belongs to login page
        cy.visit('https://rahulshettyacademy.com/client');
        cy.get('#userEmail').clear();
        cy.get('#userEmail').type('asifbaba.mohammad@infor.com');
        cy.get('#userPassword').clear('A');
        cy.get('#userPassword').type('Asif@26901');
        cy.get('#login').click();
        //below code belongs to Shopping page
        cy.get(':nth-child(2) > .card > .card-body > .w-10').click();
        cy.get(':nth-child(1) > .card > .card-body > .w-10').click();
        cy.get(':nth-child(4) > .btn').click();

        //below code belongs to Checkout page
        cy.get('.prodTotal > p').should('have.text', '$ 31500');
        cy.get('.removeWrap > .btn-primary').click();
        cy.get('.form-group > .input').clear('i');
        cy.get('.form-group > .input').type('india');
        cy.get('.ta-results > :nth-child(3)').click();
        cy.get('.btnn').click();
        /* ==== End Cypress Studio ==== */
    });
});   