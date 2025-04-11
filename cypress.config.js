const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '8ury4z',

  // defaultCommandTimeout: 8000, // 👈 sets default command timeout to 8 seconds
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    Base_URL:'https://rahulshettyacademy.com',
    URL_Angular: 'https://rahulshettyacademy.com/angularpractice/'
  }

});
