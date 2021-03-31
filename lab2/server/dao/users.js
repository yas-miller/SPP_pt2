const {v4} = require('uuid');
const bcrypt = require('bcrypt');

const BaseDAO = require('../dao/mySQL');
const {Users, User} = require('../model/users');

const path = require("path");
const properties = require('properties-reader')(path.join(__dirname, '../properties.properties'));

class UsersDAO extends Users {
    constructor() {
        super();
        this.db = new BaseDAO(properties.getRaw('mysql.table2'));
        //this.db.table = 'users';

        //MySQL.create(data)
        this.db.createUser = async (user) => {
            const test = this.create([user]).then((result) => {
                console.log('db value added');
                return result;
            }).catch(error => console.log(error));
            console.log(test);
            return test;
        }
    }
}

let users = new UsersDAO();
users.push(new User(new v4(),"test@google.com", bcrypt.hashSync("12345678", bcrypt.genSaltSync(10))));

module.exports = users;
