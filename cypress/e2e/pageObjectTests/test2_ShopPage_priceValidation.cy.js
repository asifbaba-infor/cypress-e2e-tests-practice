/// <reference types="cypress"/>
import ShopPage from "../../support/pageObjects/ShopPage"

describe('Hooks', function () {

    beforeEach(function () {
        //runs once before all tests in the block

        cy.fixture('PageObjects/test2_ShopPage').then(function (data) { //passing fixture file name in PageObjects, and storing "data" object
            this.data = data //storing local 'data' into 'this.data' globally to access outside as well
        })
    })

    it('First Tc: Shop Page PRICE validation from PageObjects for MULTIPLE PRODUCTS', function () {

        const shopPage = new ShopPage()   //creating object of the "ShopPage"

        var sum = 0  //for adding the price of mobiles and validation

        cy.visit('https://rahulshettyacademy.com/angularpractice/')

        shopPage.getShopTab().click()

        const ProductArray = this.data.productNames; //Multiple products in an array

        ProductArray.forEach((element) => {  //iterating through Array and adding each element using "selectProduct" custom command
            cy.selectProduct(element);
        });

        shopPage.getCheckout().click()

        // cy.pause()
        cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
            cy.log($el.text()) //logging the price of each mobile
            // we get "₹. 85000", "₹. 65000", "₹. 50000", "₹. 100000"

            const priceAmt = $el.text() //extracting each text
            var res = priceAmt.split(" ") //splitting based on 'spaces'  => ['₹.','85000']

            res = res[1].trim() //only using '85000' and 'trim()' to remove any additional spaces
            cy.log(res)   //here we get "85000", "65000", "50000", "100000" exactly and we can perform any operations

            sum = Number(sum) + Number(res)  //converting both String "res","sum" to Number to get sum



        }).then(function () {
            cy.log(sum)  //logging here because as "JavaScript" is asynchronous we resolve promise to wait until the summation is done
            //finally here we get "300000"
        })

        cy.get('h3 strong').then(function (element) {
            const totalAmt = element.text() //extracting total amount text
            var total = totalAmt.split(" ") //splitting based on 'spaces'  => ['₹.','300000']

            total = total[1].trim() //only using '300000' ,'trim()' to remove any additional spaces
            cy.log(total)   //here we get "300000"

            expect(Number(total)).to.equal(sum) //Assertion of 'Total' to 'Sum' her we are converting total because it is "String"
        })

        shopPage.getFinalCheckout().click()

        shopPage.getDeliveryLocation(this.data.deliveryLocation).click()

        shopPage.getCheckbox().check({ force: true })  //checkbox selection is failing due to element is being covered by another element
        //so force checked 

        shopPage.getPurchase().click()

        shopPage.getSuccessMessage()


    })

})