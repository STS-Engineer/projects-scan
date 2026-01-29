const scanConfig = require('../config/scanConfig');
const { scanTable } = require('../services/dbScanner.service');
const { generateHTMLReport } = require('../services/report.service');
const { sendReportEmail } = require('../services/email.service');

const runReports = async () => {
  for (const report of scanConfig) {
    try {
      // Scan table with optional filter
      const rows = await scanTable(report.db, report.table, report.filter);

      // Generate HTML report
      let html;
      if (report.db === 'CUSTOMER_INTERACTION') {
        html = generateHTMLReport(report.reportName, rows);
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
