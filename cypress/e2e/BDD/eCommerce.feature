Feature: End to End Testing for E-commerce Application

    @smoke
    Scenario: Ecommerce products delivery
        Given I am on Ecommerce Page
        When I fill details in the Application
        And I add items to Cart and checkout
        And Validate the total price limit
        Then Go to Final Checkout and Select the country submit and verify Thankyou

    @regression
    Scenario: Ecommerce products delivery with dynamic data
        Given I am on Ecommerce Page
        When I fill dynamic details in the Application
            | name | email             | password  |
            | Jhon | jhon123@gmail.com | Jhon@7890 |
        And I add items to Cart and checkout
        And Validate the total price limit
        Then Go to Final Checkout and Select the country submit and verify Thankyou