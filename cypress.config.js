const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '8ury4z',
  video: true,
  defaultCommandTimeout: 6000,
  reporter: 'cypress-mochawesome-reporter', // 👈 new reporter

  env: {
    Base_URL: 'https://rahulshettyacademy.com',
    URL_Angular: 'https://rahulshettyacademy.com/angularpractice/',
  },

  retries: {
    "runMode": 1,
    "openMode": 1
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); // 👈 required setup
    }
  }
});
