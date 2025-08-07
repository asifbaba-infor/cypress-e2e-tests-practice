const { defineConfig } = require('cypress');
const browserify = require("@cypress/browserify-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');
const ExcelJs = require('exceljs');


async function setupNodeEvents(on, config) {
  // Add Mochawesome reporter plugin FIRST
  require('cypress-mochawesome-reporter/plugin')(on);

  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );

  // Helper function to find text in Excel worksheet
  const readExcel = (worksheet, searchText) => {
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

  // Mock database tasks
  on('task', {
    'sqlServer:execute': (query) => {
      console.log(`Mock executing query: ${query}`);
      // Return mock data based on the query
      if (query.includes('Products')) {
        return [
          ['1', 'Product 1', 'Description 1', 19.99],
          ['2', 'Product 2', 'Description 2', 29.99],
          ['3', 'Product 3', 'Description 3', 39.99]
        ];
      }
      return [];
    },

    excelToJsonConverter: (filePath) => {
      try {
        // Basic configuration that works with most Excel files
        const result = excelToJson({
          source: fs.readFileSync(filePath)
        });

        // Get the first sheet name
        const firstSheetName = Object.keys(result)[0];

        // Create a simple array with the data
        const data = result[firstSheetName] || [];

        // Return a structure with data property
        return { data };
      } catch (error) {
        console.error('Excel conversion error:', error);
        return { data: [] };
      }
    },

    async WriteExcelTest({ searchText, replaceText, change, filepath }) {
      try {
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
          return true;
        } else {
          console.log(`Search text "${searchText}" not found in the Excel file.`);
          return false;
        }
      } catch (error) {
        console.error('Error updating Excel file:', error);
        return false;
      }
    }
  });

  return config;
}

module.exports = defineConfig({
  projectId: '8ury4z',
  video: true,
  defaultCommandTimeout: 6000,
  reporter: 'cypress-mochawesome-reporter', // 👈 new reporter

  env: {
    Base_URL: 'https://rahulshettyacademy.com',
    URL_Angular: 'https://rahulshettyacademy.com/angularpractice/',
    // Add environment variables for credentials - DO NOT put actual values here
    // These should be set via cypress.env.json (gitignored) or CI/CD variables
    USER_EMAIL: process.env.USER_EMAIL || 'test@example.com',
    USER_PASSWORD: process.env.USER_PASSWORD || 'dummypassword'
    // Do not hardcode JWT tokens here - they will be generated during test execution
  },

  retries: {
    "runMode": 1,
    "openMode": 1
  },

  e2e: {
    setupNodeEvents,
    experimentalStudio: true,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
    excludeSpecPattern: 'cypress/e2e/**/stepDef.js'
  }
});

