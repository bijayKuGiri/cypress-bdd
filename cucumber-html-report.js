const report = require("multiple-cucumber-html-reporter");
report.generate({
  jsonDir: "cypress/cucumber-json", // ** Path of .json file **//
  reportPath: "./Reports/cucumber-htmlreport",
  metadata: {
    browser: {
      name: "chrome",
      version: "100",
    },
    device: "Local test machine",
    platform: {
      name: "MAC",
      version: "Monterrey",
    },
  },
});
