const ExcelJs = require('exceljs');

async function WriteExcelTest(searchText, replaceText, change, filepath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filepath);

    const worksheet = workbook.getWorksheet('Sheet1');
    const result = readExcel(worksheet, searchText);

    // Check if the search text was found before updating
    if (result.row > 0 && result.column > 0) {
        const cell = worksheet.getCell(result.row, result.column + change.colChange);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(filepath);
        console.log('Excel file updated successfully');
    } else {
        console.log(`Search text "${searchText}" not found in the Excel file.`);
    }
}

function readExcel(worksheet, searchText) {
    let result = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                result.row = rowNumber;
                result.column = colNumber;
            }
        });
    });
    return result;
}

// function WriteExcelTest(searchText, replaceText, filepath)
//updating Price "{ rowchange: 0, colChange: 2 }" in Excel, moving "2" cell columns forward for updating price
WriteExcelTest("Grapes", 500, { rowchange: 0, colChange: 2 }, "C:/Users/amohammad1/Downloads/download.xlsx");