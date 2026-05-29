const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: 'postgres', // Connect to the default 'postgres' db first
});

async function createDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully.');
    
    const dbName = process.env.DB_NAME;
    console.log(`Checking if database "${dbName}" exists...`);
    
    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbName}'`);
    
    if (res.rowCount === 0) {
      console.log(`Database "${dbName}" not found, creating it...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.error('Error executing database creation:', err);
  } finally {
    await client.end();
  }
}

createDatabase();
