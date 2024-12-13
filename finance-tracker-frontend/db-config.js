import fs from 'fs';
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pg;

// Setup the database connection with SSL configuration
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL_CERT).toString(), // Dynamically load CA certificate
    rejectUnauthorized: true, // Ensure SSL validation
  },
});

const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    client.release();
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
  }
};

testDbConnection();

export default pool;