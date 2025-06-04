class LoginPage {
    
    visit() {
        return cy.visit('https://rahulshettyacademy.com/client')
    }

    getUserEmail() {
        return cy.get('#userEmail')
    }

    getUserPassword() {
        return cy.get('#userPassword')
    }

    getLoginButton() {
        return cy.get('#login')
    }

    login(email, password) {
        this.visit()
        this.getUserEmail().clear().type(email)
        this.getUserPassword().clear().type(password)
        this.getLoginButton().click()
    }
}

export default LoginPage