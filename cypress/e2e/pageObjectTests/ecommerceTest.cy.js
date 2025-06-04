/// <reference types="cypress"/>
import LoginPage from "../../support/pageObjects/LoginPage"
import ProductsPage from "../../support/pageObjects/ProductsPage"
import CheckoutPage from "../../support/pageObjects/CheckoutPage"

describe('E-commerce Transaction Test', () => {
    
    beforeEach(() => {
        cy.fixture('PageObjects/ecommerceTest').as('testData')
    })
    
    it('should complete a purchase transaction', function() {
        // Initialize page objects
        const loginPage = new LoginPage()
        const productsPage = new ProductsPage()
        const checkoutPage = new CheckoutPage()
        
        // Login to the application
        loginPage.visit()
        loginPage.getUserEmail().clear().type(this.testData.email)
        loginPage.getUserPassword().clear().type(this.testData.password)
        loginPage.getLoginButton().click()
        
        // Add products to cart
        productsPage.addProductToCart(2)
        productsPage.addProductToCart(1)
        productsPage.goToCart()
        
        // Checkout process
        checkoutPage.validateTotal(this.testData.totalAmount)
        checkoutPage.removeItem()
        checkoutPage.selectCountry(this.testData.country, this.testData.countryOptionIndex)
        checkoutPage.placeOrder()
    })
})