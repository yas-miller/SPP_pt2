const {v4} = require('uuid');
const bcrypt = require('bcrypt');
const Base = require('base');

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

class Users extends Base {
    //MySQL.create(data)
    async addUsers(uuid, name, description, dateTime) {
        const result = await dbDAO.create([...arguments]);
        console.log(result);
        return result;
    }
}

let users = new Tasks();
users.push(new User("member@tut.by", bcrypt.hashSync("12343210", bcrypt.genSaltSync(10))));
users.push(new User("vlad@tut.by", bcrypt.hashSync("12345678", bcrypt.genSaltSync(10))));

module.exports = users;