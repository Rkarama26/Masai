// jest.config.cjs
module.exports = {
  testEnvironment: "node",
  verbose: true,
  testTimeout: 20000,
  testMatch: ["**/tests/**/*.test.js"], 
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Integration Test Report",
        outputPath: "test-report/report.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
         theme: "darkTheme",
        dateFormat: "dd mmm yyyy HH:MM:ss"
      }
    ]
  ]
};
