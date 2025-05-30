describe('JSON Web Tokens (JWT)', () => {

    it('Login with token via loinAPI(custom command) that we created', () => {

        //Setting local storage with "token" so we dont need to login with credentials(By passing the login)
        cy.loginAPI().then(function () {
            //here before loading the url we are setting the token , So we can directly login
            cy.visit("https://rahulshettyacademy.com/client", {
                onBeforeLoad: function (window) {
                    //using the token" in cypress environment(cypress.config.js), which was set in the Custom command(loginAPI())
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        })

    })
})