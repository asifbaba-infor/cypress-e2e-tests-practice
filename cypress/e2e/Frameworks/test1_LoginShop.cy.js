describe('Login and Shop items', () => {

    it('Login with credentials, Shop and checkout', () => {
        cy.visit('https://rahulshettyacademy.com/loginpagePractise/#/')
        cy.get('#username').type('rahulshettyacademy ')
        cy.get('#password').type('learning')
        cy.get('#terms').check()
        cy.get('#signInBtn').click()
    })
})