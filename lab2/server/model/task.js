const {v4} = require('uuid');
const Base = require('base');

class Task {
    constructor(uuid, name, description, dateTime) {
        this.uuid = uuid,
        this.name = name,
        this.description = description,
        this.dateTime = dateTime
    }
}

class Tasks extends Base {
    //MySQL.create(data)
     async addTask(uuid, name, description, dateTime) {
        const result = await dbDAO.create([...arguments]);
        console.log(result);
        return result;
    }
}

let taskArr = new Tasks();

module.exports = { taskArr, Task };
