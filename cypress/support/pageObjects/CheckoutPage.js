class CheckoutPage {
    
    getTotalAmount() {
        return cy.get('.prodTotal > p').first()
    }

    getRemoveButton() {
        return cy.get('.removeWrap > .btn-primary').first()
    }

    getCountryInput() {
        return cy.get('.form-group > .input')
    }

    getCountryOption(index) {
        return cy.get(`.ta-results > :nth-child(${index})`)
    }

    getPlaceOrderButton() {
        return cy.get('.btnn')
    }

    validateTotal(amount) {
        this.getTotalAmount().should('have.text', amount)
    }

    removeItem() {
        this.getRemoveButton().click()
    }

    selectCountry(countryName, optionIndex) {
        this.getCountryInput().clear().type(countryName)
        this.getCountryOption(optionIndex).click()
    }

    placeOrder() {
        this.getPlaceOrderButton().click()
    }
}

export default CheckoutPage