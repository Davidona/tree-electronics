require("dotenv").config();https://github.com/Davidona/tree-electronics/blob/master/dbConfig.js

const { Pool } = require("pg");

const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = { pool };
