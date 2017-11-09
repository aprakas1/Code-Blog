var mysql = require("mysql");
console.log("connections.js loaded");

// var cnx = mysql.createPool({
//     connectionLimit: 10,
//     host: process.env.MYSQLHOST,
//     user: process.env.MYSQLUSERNAME, // use environmental vars for sql
//     password: process.env.MYSQLPASSWORD,
//     database: process.env.MYSQLDBNAME
// });
var cnx = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', // use environmental vars for sql
    password: 'qazplm123098',
    database: 'blog_db'
});


cnx.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});


module.exports = cnx;

