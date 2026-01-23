const scanConfig = require('../config/scanConfig');
const { scanTable } = require('../services/dbScanner.service');
const { generateHTMLReport, generateprojectsReport } = require('../services/report.service');
const { sendReportEmail } = require('../services/email.service');

// Single unified function to run all reports
const runReports = async () => {
  for (const report of scanConfig) {
    try {
      // Scan the table specified in config
      const rows = await scanTable(report.db, report.table);

      // Choose the appropriate report generator based on db type
      let html;
      if (report.db === 'CUSTOMER_INTERACTION') {
        html = generateHTMLReport(report.reportName, rows);
      } else if (report.db === 'PROJECTS_DB') {
        html = generateprojectsReport(report.reportName, rows);
      }

      // Send email
      await sendReportEmail({
        to: report.recipients,
        subject: report.reportName,
        html
      });

      console.log(`✅ Report sent: ${report.reportName} (${report.db})`);
    } catch (err) {
      console.error(`❌ Failed report: ${report.reportName}`, err);
    }
  }
};

module.exports = { runReports };