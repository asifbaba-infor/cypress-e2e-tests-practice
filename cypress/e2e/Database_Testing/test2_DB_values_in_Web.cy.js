/// <reference types="cypress"/>

context('Window', () => {
  let data
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/waiting')
  })

  it('Database interaction with mock data', () => {
    cy.task('sqlServer:execute', 'select * from Products').then(function (result) {
      data = result;
    })
  })

  it('cy.wait() wait and type the DB data in input fields', () => {
    
    cy.get('.wait-input1').type(data[0][2])
    cy.wait(1000)
    cy.get('.wait-input2').type(data[1][2])
    cy.wait(1000)
    cy.get('.wait-input3').type(data[2][2])
    cy.wait(1000)
  })
});