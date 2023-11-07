"use strict";

// DB Setup
const { Client } = require('pg');

let dbHost = { host: process.env.DATABASE_URL,
               post: process.env.DATABASE_PORT,
               database: process.env.DATABASE_DB };

const client = new Client(dbHost);

client.connect();
module.exports = client;