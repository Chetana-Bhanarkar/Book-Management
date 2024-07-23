require('dotenv').config() ; 
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    user : process.env.DB_USER
})

connection.connect((err)=>{
    if (err) {
        return err;
    }
    console.log('database connected successfully');
})


module.exports = connection