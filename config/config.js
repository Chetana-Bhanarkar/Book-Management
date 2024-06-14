require('dotenv').config();
const mysql = require('mysql');

const pool = mysql.createPool({
    host : process.env.HOST ,
    user : process.env.USER,
    database : process.env.DATABASE,
    password : process.env.PASSWORD,
    // port : process.env.PORT
})

// console.log(pool);
module.exports = pool ; 