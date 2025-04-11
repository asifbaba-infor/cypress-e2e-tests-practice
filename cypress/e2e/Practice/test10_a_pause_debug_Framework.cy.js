/// <reference types="cypress"/>

it('First Tc: Click on "Shop" and add items to cart', function () {

    cy.visit('https://rahulshettyacademy.com/angularpractice/')
    cy.contains('Shop').click()

    cy.get('h4.card-title').each(($el, index, $list) => { //extractring all phones with different title
        if ($el.text().includes('Blackberry')) {    //adding "Blackberry"

            // cy.get(`:nth-child(${index+1}) > .card > .card-footer > .btn`).click() //passing the "index+1" value in 'child()' as its starts from 1 and index from 0
  
            cy.log('Pause')
            cy.pause() // to 'pause' the test , we can 'Resume' the test in Test runner

            cy.get('button[class="btn btn-info"]').eq(index).click().debug()  //to 'debug' the test , we can 'Resume' the test in Test runner

            cy.get('a.nav-link').eq(2).click() //clicking checkout button
        }

    })

})
