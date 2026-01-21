const databases = require('../config/databases');

const scanTable = async (dbKey, table) => {
  if (!dbKey || !table) {
    throw new Error('Database key or table name is missing');
  }

  const pool = databases[dbKey];
  if (!pool) {
    throw new Error(`Database ${dbKey} not found`);
  }

  const client = await pool.connect();

  try {
    const query = `
      SELECT *
      FROM ${table}
    `;

    const { rows } = await client.query(query);
    return rows;

  } finally {
    client.release();
  }
};

module.exports = { scanTable };
