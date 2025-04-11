/// <reference types="cypress"/>

describe('Hooks in Framework', function () {

    before(function () {
        //runs once before all tests in the block

        cy.fixture('Practice/test9_Framework_Data').then(function (data) { //passing fixture file name in Practice, and storing "data" object
            this.data = data //storing local 'data' into 'this.data' globally to access outside as well
        })
    })



    it('First Tc: Entering Name and selecting Gender', function () {

        cy.visit('https://rahulshettyacademy.com/angularpractice/')

        // cy.get('input[name="name"]:nth-child(2)').type("Hello")  // we can use this locator also ":nth-child(1) > .form-control"
        // cy.get('#exampleFormControlSelect1').select("Female")

        cy.get('input[name="name"]:nth-child(2)').type(this.data.name)  // retrieving "name" value from "this.data" global object
        cy.get('#exampleFormControlSelect1').select(this.data.gender)   // retrieving "name" value from "this.data" global  object

    })



    it.only('second Tc: Valiadtion in "Two-way Data Binding" field, length in "Name" field , radio btn disabled', function () {

        cy.visit('https://rahulshettyacademy.com/angularpractice/')

        cy.get('input[name="name"]:nth-child(2)').type(this.data.name)
        cy.get('#exampleFormControlSelect1').select(this.data.gender)

        cy.get('input[name="name"]:nth-child(1)').should('have.value', this.data.name) //validation on 'Name' in binding field

        //we use 'have.attr' jQuery method to validate based on attributes and their values
        cy.get('input[name="name"]:nth-child(2)').should('have.attr', 'minlength', '2') //validation of 'Length' in first Name field

        //another way to validate attribute
        // cy.get('input[name="name"]:nth-child(2)').should('be.visible').then(function (el) {
        //     const length = el.prop('minlength'); // Retrieve the 'minlength' property
        //     expect(length).to.equal(2); // Validate that the 'minlength' property is 2
        // });

        cy.get('#inlineRadio3').should('be.disabled') //validation on 'radioBtn' disabled or not

        cy.get('input[name="bday"]').type('2001-09-26') //typing into dob


    })

})