/// <reference types="cypress" />

describe('My Second Test Suite', function () {

    it('Checkboxes', function () {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('input#checkBoxOption1').click()  //using 'click'
        cy.get('#checkBoxOption1').should('be.checked').should('have.value', 'option1')  //verifying checkbox is checked and validating 'value' with multiple should 

        cy.get('#checkBoxOption2').check().should('be.checked').and('have.value', 'option2') //using 'check' and verifying checkbox is checked, using 'and' to avoid multiple 'should'
        cy.get('#checkBoxOption2').uncheck().should('not.be.checked')  //unchecking and validating

        cy.get('input[type="checkbox"]').check(['option2', 'option3']) //checking multiple checkboxes by passing 'value' in array

    })

    it('Static Dropdowns', function () {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('select#dropdown-class-example').select('option1').should('have.value', 'option1')  //selecion by 'value'
        cy.get('select').select('Option2').should('have.value', 'option2') //selecion by 'Text'
        cy.get('#dropdown-class-example').select(3).should('have.value', 'option3') //selecion by 'index'

    })

    it('Dynamic Dropdowns', function () {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('input#autocomplete').type('ind')  //By typing 'ind' we get few suggestions
        cy.get('li.ui-menu-item div').each(($el, index, $list) => { //traverse through each option
            if ($el.text() == 'India') {    //slecting 'India' as option
                $el.trigger('click');
            }
        })
        cy.get('input#autocomplete').should('have.value', 'India')

    })

    it('Visible Invisible elements', function () {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('input#displayed-text').should('be.visible')  //verifying it is visible
        cy.get('#hide-textbox').click()  //hiding the element
        cy.get('input#displayed-text').should('not.be.visible')  //verifying it is not visible
        cy.get('#show-textbox').click()  //showing the element
        cy.get('input#displayed-text').should('be.visible')  //verifying it is visible

    })

    it('Radio buttons', function () {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('label[for="radio1"]>input').click()  //using 'click'
        cy.get('[for="radio1"]>input').should('be.checked').should('have.value', 'radio1')  //verifying radiobtn is checked and validating 'value' with multiple should 

        cy.get('input[value="radio2"]').check().should('be.checked').and('have.value', 'radio2') //using 'check' and verifying radiobtn is checked, using 'and' to avoid multiple 'should'
        
        cy.get('fieldset>label>input[name="radioButton"]').check(['radio3']).should('be.checked').and('have.value', 'radio3') //selcting radiobtn by passing 'value' in array and verifying radiobtn is checked
    })


})