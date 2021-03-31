const MySQL = require("mysql-promise-crud");

const path = require("path");
const properties = require('properties-reader')(path.join(__dirname, '../properties.properties'));

let dbConfig = {
    user: properties.getRaw('mysql.user'),
    password: properties.getRaw('mysql.password'),
    host: properties.getRaw('mysql.host'),
    connectionLimit: properties.getRaw('mysql.connectionLimit')
}

class BaseDAO extends MySQL {
    constructor(table) {
        super(dbConfig, properties.getRaw('mysql.database'), table);
    }
    // MySQL.read(spec = null)
    async readAll() {
        const test = await this.read();
        return test;
    }
    // MySQL.update(up, spec = null)
    async updateAll(up) {
        const test = [];
        up.forEach(value => this.update(value, { uuid: value.uuid }).then((result) => {
            console.log('db table value updated');
            test.push(result);
        }).catch(error => console.log(error)));
        return test;
    }
    // MySQL.delete(spec = null)
    async deleteAll() {
        const test = await this.delete();
        return test;
    }
}

module.exports = BaseDAO;
