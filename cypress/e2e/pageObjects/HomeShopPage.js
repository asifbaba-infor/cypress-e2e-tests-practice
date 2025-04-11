class HomeShopPage {

    getName() {
        return cy.get('input[name="name"]:nth-child(2)')
    }

    getEmail() {
        return cy.get('input[name="email"]')
    }

    getPassword() {
        return cy.get('#exampleInputPassword1')
    }

    getLoveIceCream() {
        return cy.get('#exampleCheck1')
    }

    getGender() {
        return cy.get('#exampleFormControlSelect1')
    }

    getEntrepreneur() {
        return cy.get('#inlineRadio3')
    }

    getDateofBirth() {
        return cy.get('input[name="bday"]')
    }

    getTwowayDataBinding() {
        return cy.get('input[name="name"]:nth-child(1)')
    }

    getShopTab() {
        return cy.contains('Shop')
    }

    getProductandADD(productName) {
        return cy.get('h4.card-title').each(($el, index, $list) => { //extractring all phones with different title
            if ($el.text().includes(productName)) {
                cy.get('button[class="btn btn-info"]').eq(index).click()
            }

        })
    }

    getMultipleProductsandADD(productArray) {
        productArray.forEach((element) => {
            cy.selectProduct(element); // custom Cypress command
        });
    }

    getCheckout() {
        return cy.contains(/\s*Checkout\s*/);  //using " regex to match "Checkout" regardless of spacing:"

    }

    getAssertion_Sum_Total() {
        var sum = 0  //for addinf the price of mobiles and validation
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

        return cy.get('h3 strong').then(function (element) {
            const totalAmt = element.text() //extracting total amount text
            var total = totalAmt.split(" ") //splitting based on 'spaces'  => ['₹.','300000']

            total = total[1].trim() //only using '300000' ,'trim()' to remove any additional spaces
            cy.log(total)   //here we get "300000"

            expect(Number(total)).to.equal(sum) //Assertion of 'Total' to 'Sum' her we are converting total because it is "String"
        })

    }

    getFinalCheckout() {
        return cy.contains(/\s*Checkout\s*/);

    }

    getDeliveryLocation(deliveryLocation) {
        cy.get('input.validate ').type(deliveryLocation)
        cy.wait(2000)
        return cy.contains(deliveryLocation)

    }

    getCheckbox() {
        cy.wait(2000)
        return cy.get('#checkbox2')
    }

    getPurchase() {
        return cy.get('input[value="Purchase"]')
    }

    getSuccessMessage() {
        return cy.get('div.alert').then(function (element) {
            const actualText = element.text()
            expect(actualText.includes("Success")).to.be.true  //another way of text comparision
        })
    }

    getHomeab() {
        return cy.contains('Home')
    }

}

export default HomeShopPage;
