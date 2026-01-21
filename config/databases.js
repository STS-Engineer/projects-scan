const { Pool } = require('pg');

const databases = {
  CUSTOMER_INTERACTION: new Pool({
    user: 'adminavo',
    host: 'avo-adb-001.postgres.database.azure.com',
    database: 'Customer_IA',
    password: '$#fKcdXPg4@ue8AW',
    port: 5432,
    ssl: { rejectUnauthorized: false }
  }),

  PROJECTS_DB: new Pool({
    user: 'administrationSTS',
    host: 'avo-adb-002.postgres.database.azure.com',
    database: 'IT_ProjectsDB',
    password: 'St$@0987',
    port: 5432,
    ssl: { rejectUnauthorized: false }
  })
};

module.exports = databases;
