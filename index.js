/**
 * index.js
 * Cron-based report runner
 */

require('dotenv').config();
const cron = require('node-cron');
const { runReports, runProjectsReport } = require('./jobs/report.job');

// ----------------------------------------
// ⏰ Scheduled execution
// ----------------------------------------
// Every day at 08:00
cron.schedule('37 11 * * *', async () => {
  console.log('⏰ Scheduled report job started');

  try {
    await runReports();
    await runProjectsReport();
    console.log('✅ Scheduled report job completed');
  } catch (err) {
    console.error('❌ Scheduled report job failed:', err);
  }
});

// ----------------------------------------
// Keep process alive
// ----------------------------------------
console.log('🚀 Report service started (cron mode)');

// ----------------------------------------
// Graceful shutdown
// ----------------------------------------
process.on('SIGINT', () => {
  console.log('🛑 Shutting down report service...');
  process.exit(0);
});
