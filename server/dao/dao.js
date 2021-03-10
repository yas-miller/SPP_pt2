var mySQL = require("mysql-promise-crud");
var properties = require('properties-reader')('../../properties.properties');
var logger = require("../utils/logger");

const dbConfig = {
    user: properties.get('mysql.user'),
    password: properties.get('mysql.password'),
    host: properties.get('mysql.host'),
    connectionLimit: properties.get('mysql.connectionLimit')
}

const dbDAO = new mySQL(config, properties.get('mysql.database'), properties.get('mysql.table'));

module.exports = dbDAO;
