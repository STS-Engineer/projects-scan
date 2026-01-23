require('dotenv').config();
const cron = require('node-cron');
const { runReports } = require('./jobs/report.job');

// Run all reports at 08:00 daily
cron.schedule('58 10 * * *', async () => {
  console.log('⏰ Scheduled report job started');

  try {
    await runReports();
    console.log('✅ Scheduled report job completed');
  } catch (err) {
    console.error('❌ Scheduled report job failed:', err);
  }
});

console.log('🚀 Report service started (cron mode)');

process.on('SIGINT', () => {
  console.log('🛑 Shutting down report service...');
  process.exit(0);
});
