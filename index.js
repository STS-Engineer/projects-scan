require('dotenv').config();
const cron = require('node-cron');
const { runReports } = require('./jobs/report.job');
const conversationRoutes = require('./routes/conversation.routes');
const express = require("express");

const app = express();

// Mount routes
app.use('/', conversationRoutes);

// Run all reports at 08:56 daily
cron.schedule('16 09 * * 1', async () => {
  console.log('⏰ Scheduled report job started');

  try {
    await runReports();
    console.log('✅ Scheduled report job completed');
  } catch (err) {
    console.error('❌ Scheduled report job failed:', err);
  }
});

console.log('🚀 Report service started (cron mode)');

// ✅ SET PORT HERE
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🌍 Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('🛑 Shutting down report service...');
  process.exit(0);
});
