const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '8ury4z',
  video: true,

  env: {
    Base_URL: 'https://rahulshettyacademy.com',
    URL_Angular: 'https://rahulshettyacademy.com/angularpractice/',
  },

  e2e: {
    defaultCommandTimeout: 8000,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); // 👈 required setup
    },
    reporter: 'cypress-mochawesome-reporter', // 👈 new reporter
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false,
      html: true,
      json: true
    }
  }
});
