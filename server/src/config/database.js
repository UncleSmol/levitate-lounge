const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2');

// Load environment variables from root .env file
const result = dotenv.config({ path: path.join(__dirname, '../../../.env') });

if (result.error) {
  throw new Error(`Error loading .env file: ${result.error.message}`);
}

// Validate environment variables
const validateEnvVariables = () => {
  const required = [
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'DB_PORT',
    'DB_CONNECTION_LIMIT',
    'DB_QUEUE_LIMIT',
    'DB_WAIT_FOR_CONNECTIONS'
  ];

  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error('Environment variables check:', {
      missing,
      current: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
      }
    });
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

validateEnvVariables();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT),
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT),
  waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS === 'true'
};

const pool = mysql.createPool(config);

// Test database connection
const testConnection = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection failed:', {
        error: err.message,
        code: err.code,
        state: err.sqlState
      });
      return;
    }
    console.log('Database connected successfully');
    connection.release();
  });
};

testConnection();

const promisePool = pool.promise();
module.exports = promisePool;