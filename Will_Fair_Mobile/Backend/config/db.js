const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

//create a new pool here using the connection string from the environment variables
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false //ignore ssl certificate verification
  }
});

module.exports = pool;