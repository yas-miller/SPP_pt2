class User {
    constructor(uuid, email, passwordHash) {
        this.uuid = uuid,
        this.email = email;
        this.passwordHash = passwordHash;
    }
}

class Users extends Array {
    constructor() {
        super();
    }
}

module.exports = {Users, User};
