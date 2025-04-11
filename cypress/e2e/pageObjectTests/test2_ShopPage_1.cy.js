/// <reference types="cypress"/>
import ShopPage from "../pageObjects/ShopPage"

describe('Hooks', function () {

    beforeEach(function () {
        //runs once before all tests in the block

        cy.fixture('PageObjects/test2_ShopPage').then(function (data) { //passing fixture file name in PageObjects, and storing "data" object
            this.data = data //storing local 'data' into 'this.data' globally to access outside as well
        })
    })


    it('First Tc: Shop Page validation from PageObjects for only one product', function () {

        const shopPage = new ShopPage()   //creating object of the "ShopPage"

        cy.visit('https://rahulshettyacademy.com/angularpractice/')

        shopPage.getShopTab().click()

        shopPage.getProductandADD(this.data.productName) //only one product

        shopPage.getCheckout().click()

        shopPage.getFinalCheckout().click()

        shopPage.getDeliveryLocation(this.data.deliveryLocation).click()

        shopPage.getCheckbox().check({ force: true })  //checkbox selection is failing due to element is being covered by another element
        //so force checked 

        shopPage.getPurchase().click()

        shopPage.getSuccessMessage() // validation of "Success! Thank you! Your order will be delivered in next few weeks :-).""


    })

    it('Second Tc: Shop Page validation from PageObjects for MULTIPLE PRODUCTS', function () {

        const shopPage = new ShopPage()   //creating object of the "ShopPage"

        cy.visit('https://rahulshettyacademy.com/angularpractice/')

        shopPage.getShopTab().click()

        const ProductArray = this.data.productNames; //Multiple products in an array

        ProductArray.forEach((element) => {  //iterating through Array and adding each element using "selectProduct" custom command
            cy.selectProduct(element);
        });

        shopPage.getCheckout().click()

        shopPage.getFinalCheckout().click()

        shopPage.getDeliveryLocation(this.data.deliveryLocation).click()

        shopPage.getCheckbox().check({ force: true })  //checkbox selection is failing due to element is being covered by another element
        //so force checked 

        shopPage.getPurchase().click()

        shopPage.getSuccessMessage()


    })

})