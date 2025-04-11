class HomePage {

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

    getDateofBirth(){
        return cy.get('input[name="bday"]')
    }

    getTwowayDataBinding() {
        return cy.get('input[name="name"]:nth-child(1)')
    }

    getShopTab() {
        return cy.contains('Shop')
    }

}

export default HomePage;
