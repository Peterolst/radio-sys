var mysql = require("mysql");
const config = require('../config/index');

var connection = mysql.createConnection({
    host: config.default.dbhost,
    user: config.default.dbuser,
    password: config.default.dbpass,
    database: config.default.dbdb
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;