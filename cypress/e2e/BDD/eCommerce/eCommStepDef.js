import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomeShopPage from '../../../support/pageObjects/HomeShopPage';

const homeShopPage = new HomeShopPage();

Given('I am on Ecommerce Page', function () {
    cy.visit(Cypress.env('Base_URL') + '/angularpractice/'
    )
})

When('I fill details in the Application', function () {
    homeShopPage.getName().type(this.data.name)
    homeShopPage.getEmail().type(this.data.email)
    homeShopPage.getPassword().type(this.data.password)
    homeShopPage.getLoveIceCream().check()
})

When('I add items to Cart and checkout', function () {
    homeShopPage.getShopTab().click()
    cy.wait(1000)
    homeShopPage.getMultipleProductsandADD(this.data.productNames)
    cy.wait(1000)
    homeShopPage.getCheckout().click()
})

When('Validate the total price limit', function () {
    homeShopPage.getAssertion_Sum_Total()
})


Then('Go to Final Checkout and Select the country submit and verify Thankyou', function () {
    homeShopPage.getFinalCheckout().click()
    homeShopPage.getDeliveryLocation(this.data.deliveryLocation).click()
    homeShopPage.getCheckbox().check({ force: true })  //checkbox selection is failing due to element is being covered by another element so force checked 
    homeShopPage.getPurchase().click()
    homeShopPage.getSuccessMessage()
})

When('I fill dynamic details in the Application', function (dataTable) {
    // Using dataTable to fill in dynamic details
    homeShopPage.getName().type(dataTable.rawTable[1][0])
    homeShopPage.getEmail().type(dataTable.rawTable[1][1])
    homeShopPage.getPassword().type(dataTable.rawTable[1][2])
    homeShopPage.getLoveIceCream().check()
})
