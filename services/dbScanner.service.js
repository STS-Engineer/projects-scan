const databases = require('../config/databases');

const scanTable = async (dbKey, table, filter = {}) => {
  if (!dbKey || !table) {
    throw new Error('Database key or table name is missing');
  }

  const pool = databases[dbKey];
  if (!pool) {
    throw new Error(`Database ${dbKey} not found`);
  }

  const client = await pool.connect();

  try {
    let query = `SELECT * FROM ${table}`;
    const values = [];

    // Build WHERE clause if filter is provided
    if (Object.keys(filter).length > 0) {
      const conditions = Object.keys(filter).map((key, idx) => {
        values.push(filter[key]);
        return `${key} = $${idx + 1}`;
      });
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    const { rows } = await client.query(query, values);
    return rows;

  } finally {
    client.release();
  }
};

module.exports = { scanTable };
