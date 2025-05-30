const { defineConfig } = require('cypress');
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

module.exports = defineConfig({
  projectId: '8ury4z',
  video: true,
  defaultCommandTimeout: 6000,
  reporter: 'cypress-mochawesome-reporter', // 👈 new reporter

  env: {
    Base_URL: 'https://rahulshettyacademy.com',
    URL_Angular: 'https://rahulshettyacademy.com/angularpractice/',
    // token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODM3MGJlNDgxYTIwNjk1MzA0ZTQzMjkiLCJ1c2VyRW1haWwiOiJhc2lmYmFiYS5tb2hhbW1hZEBpbmZvci5jb20iLCJ1c2VyTW9iaWxlIjo5MzkwMjUyNjM0LCJ1c2VyUm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzQ4NDk1MjcwLCJleHAiOjE3ODAwNTI4NzB9.MChMjkQwzYJv2yUDj9OjZhhmFJ_onig8UN78jlFl6YU'
  },

  retries: {
    "runMode": 1,
    "openMode": 1
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); // 👈 required setup

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
        }
      });

      return config;
    }
  }
});