const mysql = require('mysql')
require('dotenv').config()
const conn = mysql.createConnection({
    // host:'localhost',
    // user:'root',
    // password:'',
    // database:'belajar_nodejs_socketio'
    // port:3306
    // ---->>> port is filled when sql is remote
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
})

conn.connect((err)=>{
    if(err) throw err
})

module.exports = conn