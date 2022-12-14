"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const lodash_1 = require("lodash");
const pg_1 = require("pg");
// const isProduction = process.env.NODE_ENV === "production";
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
exports.pool = new pg_1.Pool({
    user: process.env.DB_USER || "minhlee",
    password: process.env.DB_PASSWORD || "password",
    host: process.env.DB_HOST || "localhost",
    port: (0, lodash_1.toNumber)(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE || "db_auth",
    // connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    // ssl: isProduction
});
