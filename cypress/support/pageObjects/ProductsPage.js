class ProductsPage {
    
    getProductAddToCart(index) {
        return cy.get(`:nth-child(${index}) > .card > .card-body > .w-10`)
    }

    getCartButton() {
        return cy.get(':nth-child(4) > .btn')
    }

    addProductToCart(index) {
        this.getProductAddToCart(index).click()
    }

    goToCart() {
        this.getCartButton().click()
    }
}

export default ProductsPage