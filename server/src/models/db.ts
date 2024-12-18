import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', (): void => {
    console.log('Connected to the PostgreSQL database');
});