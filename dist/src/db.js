"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const lodash_1 = require("lodash");
const pg_1 = require("pg");
console.log(process.env.DB_USER);
function verifyEnv() {
  if (process.env.DB_USER) {
    console.log("?");
    throw new Error("Don't find database USER");
  }
  if (!process.env.DB_PASSWORD) throw new Error("Don't find database PASSWORD");
  if (!process.env.DB_HOST) throw new Error("Don't find database HOST");
  if (!process.env.DB_PORT) throw new Error("Don't find database PORT");
  if (!process.env.DB_DATABASE) throw new Error("Don't find database");
  console.log("out");
  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: (0, lodash_1.toNumber)(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    // connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    // ssl: isProduction
  };
}
// const isProduction = process.env.NODE_ENV === "production";
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
exports.pool = new pg_1.Pool({
  // ...verifyEnv(),
  // connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  // ssl: isProduction
});
