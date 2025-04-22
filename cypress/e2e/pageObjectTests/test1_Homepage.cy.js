/// <reference types="cypress"/>
import HomePage from "../pageObjects/HomePage"

describe('Hooks in Framework', function () {

    before(function () {
        //runs once before all tests in the block

        cy.fixture('PageObjects/test1_Homepage').then(function (data) { //passing fixture file name in PageObjects, and storing "data" object
            this.data = data //storing local 'data' into 'this.data' globally to access outside as well
        })
    })


    it('First Tc: Home Page validation from PageObjects', function () {

        const homePage = new HomePage()   //creating object of the "HomePage"

        cy.visit('https://rahulshettyacademy.com/angularpractice/')

        //Getting the Name field from pageObjects, typing the Data from fixtures json data
        homePage.getName().type(this.data.name)

        homePage.getEmail().type(this.data.email)

        homePage.getPassword().type(this.data.password)

        homePage.getLoveIceCream().check()

        homePage.getGender().select(this.data.gender)

        homePage.getEntrepreneur().should('be.disabled') //validation on  entrepreneur 'radioBtn' disabled or not

        homePage.getDateofBirth().type(this.data.dob)   

        homePage.getTwowayDataBinding().should('have.value', this.data.name) //validation on entered 'Name' in binding field

        //we use 'have.attr' jQuery method to validate based on attributes and their values
        homePage.getName().should('have.attr', 'minlength', '2') //validation of 'Length' in first Name field

        homePage.getShopTab().click()

    })

})