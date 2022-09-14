import { toNumber } from 'lodash';
import { Pool } from 'pg';

// const isProduction = process.env.NODE_ENV === "production";

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

export const pool = new Pool({
  user:process.env.DB_USE || 'minhlee',
  password:process.env.DB_PASSWORD || 'password',
  host:process.env.DB_HOST || 'localhost',
  port: toNumber(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE || "authdb"
  // connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  // ssl: isProduction
});
