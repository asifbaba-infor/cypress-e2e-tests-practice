class ShopPage {

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

    getCheckout() {
        return cy.contains(/\s*Checkout\s*/);  //using " regex to match "Checkout" regardless of spacing:"

    }

    getFinalCheckout() {
        return cy.contains(/\s*Checkout\s*/);

    }

    getDeliveryLocation(deliveryLocation) {
        cy.get('input.validate ').type(deliveryLocation)
        cy.wait(2000)
        return cy.contains(deliveryLocation)
        // return cy.get('div ul li a').each(($el, index, $list) => { //traverse through each option
        //     if ($el.text() == deliveryLocation) {    //slecting 'India' as option
        //         $el.trigger('click');
        //     }
        // })
        // return cy.get('.suggestions > ul > li > a').click() //Increasing wait time to load
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

export default ShopPage;
