module.exports = [
  {
    db:'CUSTOMER_INTERACTION',
    table: 'conversations',
    reportName: 'Customer Interaction  Report',
    recipients: ['mootaz.farwa@avocarbon.com']
  },
   // Report for Valeo client only
  {
    db: 'CUSTOMER_INTERACTION',
    table: 'conversations',
    reportName: 'Valeo Client Interaction Report',
    recipients: ['mootaz.farwa@avocarbon.com'],
    filter: { client_name: 'Valeo' } // filter applied
  }
];
