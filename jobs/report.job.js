const scanConfig = require('../config/scanConfig');
const { scanTable } = require('../services/dbScanner.service');
const { generateHTMLReport } = require('../services/report.service');
const { sendReportEmail } = require('../services/email.service');
const { generateprojectsReport } = require('../services/projectsreport.service'); // import your projects report

// Function to send scanConfig reports
const runReports = async () => {
  for (const report of scanConfig) {
    try {
      const rows = await scanTable(report.db, report.table);

      const html = generateHTMLReport(report.reportName, rows);

      await sendReportEmail({
        to: report.recipients,
        subject: report.reportName,
        html
      });

      console.log(`✅ Report sent: ${report.reportName}`);
    } catch (err) {
      console.error(`❌ Failed report: ${report.reportName}`, err);
    }
  }
};

// Function to send projects report
const runProjectsReport = async () => {
  for (const report of scanConfig) {
    try {
      const rows = await scanTable(report.db, report.table);

      const html = generateprojectsReport(report.reportName, rows);

      await sendReportEmail({
        to: report.recipients,
        subject: report.reportName,
        html
      });

      console.log(`✅ Report sent: ${report.reportName}`);
    } catch (err) {
      console.error(`❌ Failed report: ${report.reportName}`, err);
    }
  }
};

module.exports = { runReports, runProjectsReport };
