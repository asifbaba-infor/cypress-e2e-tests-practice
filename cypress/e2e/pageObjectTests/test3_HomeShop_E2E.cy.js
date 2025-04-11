/// <reference types="cypress"/>

// import HomeShopPage from "../pageObjects/HomeShopPage"
import HomeShopPage from "../../support/pageObjects/HomeShopPage"  //importing from support folder(best practice)
describe('Hooks', function () {

    beforeEach(function () {
        //runs once before all tests in the block

        cy.fixture('PageObjects/test3_HomeShopPage').then(function (data) { //passing fixture file name in PageObjects, and storing "data" object
            this.data = data //storing local 'data' into 'this.data' globally to access outside as well
        })
    })

    it('First Tc: End to End Flow from Home Page to Shop Page PRICE validation from PageObjects for MULTIPLE PRODUCTS', function () {

        const homeshopPage = new HomeShopPage()   //creating object of the "ShopPage"

        var sum = 0  //for adding the price of mobiles and validation

        cy.visit(Cypress.env('URL_Angular')) //passing the url through environment variable to use globally

        //Getting the Name field from pageObjects, typing the Data from fixtures json data
        homeshopPage.getName().type(this.data.name)

        homeshopPage.getEmail().type(this.data.email)

        homeshopPage.getPassword().type(this.data.password)

        homeshopPage.getLoveIceCream().check()

        homeshopPage.getGender().select(this.data.gender)

        homeshopPage.getEntrepreneur().should('be.disabled') //validation on  entrepreneur 'radioBtn' disabled or not

        homeshopPage.getDateofBirth().type(this.data.dob)

        homeshopPage.getTwowayDataBinding().should('have.value', this.data.name) //validation on entered 'Name' in binding field

        //we use 'have.attr' jQuery method to validate based on attributes and their values
        homeshopPage.getName().should('have.attr', 'minlength', '2') //validation of 'Length' in first Name field

        homeshopPage.getShopTab().click()

        homeshopPage.getProductandADD(this.data.productName) //Adding 'BlackBerry' here

        homeshopPage.getMultipleProductsandADD(this.data.productNames) //Adding "Samsung Note 8","Nokia Edge" and "iphone" here

        homeshopPage.getCheckout().click()

        homeshopPage.getAssertion_Sum_Total() //fetching sum , total and perform an Assertion

        homeshopPage.getFinalCheckout().click()

        homeshopPage.getDeliveryLocation(this.data.deliveryLocation).click()

        homeshopPage.getCheckbox().check({ force: true })  //checkbox selection is failing due to element is being covered by another element
        //so force checked 

        homeshopPage.getPurchase().click()

        homeshopPage.getSuccessMessage()


    })

})