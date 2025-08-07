beforeEach(function () {
    //runs once before all tests in the block
    cy.fixture('PageObjects/test3_HomeShopPage').then(function (data) { //passing fixture file name in PageObjects, and storing "data" object
        this.data = data //storing local 'data' into 'this.data' globally to access outside as well
    })
})