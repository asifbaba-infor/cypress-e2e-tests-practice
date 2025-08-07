const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "./cypress/cucumberReports",
    reportPath: "./cypress/cucumberReports/cucumber-html-report",
    mergeReports: true,
    openReportInBrowser: true,
    metadata: {
        browser: {
            name: "chrome",
            version: "120",
        },
        device: "Local test machine",
        platform: {
            name: "windows",
            version: "11",
        },
    },
    customData: {
        title: "Run info",
        data: [
            { label: "Project", value: "Cypress E2E Testing Practice" },
            { label: "Release", value: "2.0.0" },
            { label: "Cycle", value: "E2E-2024.001" },
            { label: "Execution Start Time", value: new Date().toLocaleString() },
            { label: "Execution End Time", value: new Date().toLocaleString() },
        ],
    },
});