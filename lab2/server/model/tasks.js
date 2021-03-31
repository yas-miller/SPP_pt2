class Task {
    constructor(uuid, name, description, dateTime) {
        this.uuid = uuid,
        this.name = name,
        this.description = description,
        this.dateTime = dateTime
    }
}

class Tasks extends Array {
    constructor() {
        super();
    }
}

module.exports = {Tasks, Task};
