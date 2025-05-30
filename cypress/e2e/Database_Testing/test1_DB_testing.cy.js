/// <reference types="cypress"/>

context('Window', () => {
  it('Database interaction with mock data', () => {
    cy.task('sqlServer:execute', 'select * from Products').then(function (result) {
      console.log(result[0][2]);
      cy.log(`Product description: ${result[0][2]}`);
    });
  });
});