const dbDAO = require('../dao/dao');

class Base extends Array {
    // MySQL.read(spec = null)
    async list(filter) {
        const persons = await dbDAO.read(filter)
        return persons;
    }

    // MySQL.update(up, spec = null)
    async modify(up, obj = null) {
        const test = await dbDAO.update(up);
        return test;
    }
    // MySQL.delete(spec = null)
    async clear() {
        const cls = await dbDAO.delete();
        return cls;
    }

    push(...items) {
        super.push(...items);
        this.modify(this);
    }
    pop() {
        super.pop();
        super.sp
        this.modify(this);
    }


}

module.exports = Base;
