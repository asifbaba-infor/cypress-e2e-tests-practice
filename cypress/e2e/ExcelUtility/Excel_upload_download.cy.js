describe('Download and Upload Excel from Web using ReadWrite Excel created Task in config.js', () => {

    it('Verify download excel change the price of any Item', () => {
        cy.visit('https://rahulshettyacademy.com/upload-download-test/');
        //downloading
        cy.get('#downloadButton').click()

        const searchItem = "Apple";
        const replacePrice = 350;
        const downloadPath = 'cypress/downloads/download.xlsx';
        //updating the price of the "Apple" to 350
        cy.task('WriteExcelTest', { searchText: searchItem, replaceText: replacePrice, change: { rowChange: 0, colChange: 2 }, filepath: downloadPath });

        //uploading
        cy.get('#fileinput').selectFile(downloadPath);

        //validation
        // cy.get('#row-1 > #cell-4-undefined').should('have.text', '350');

        //another way (finding "Apple" via contains and traversing through its parent(),parent() to get uniquely ROW and finding one COLUMN and ASSERTING)
        cy.contains(searchItem).parent().parent().find('#cell-4-undefined').should('have.text', replacePrice)


    });
});   