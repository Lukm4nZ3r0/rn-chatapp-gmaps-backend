const mysql = require('mysql')

const conn = mysql.createConnection({
    // host:'localhost',
    // user:'root',
    // password:'',
    // database:'belajar_nodejs_socketio'
    host:'remotemysql.com',
    user:'FjJMF89Yrg',
    password:'XNVyxDwdWs',
    database:'FjJMF89Yrg',
    port:3306
})

conn.connect((err)=>{
    if(err) throw err
})

module.exports = conn