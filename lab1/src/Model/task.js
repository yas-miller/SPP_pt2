const file = require('fs');

class Task {
    constructor(name, description, dateTime) {
        this.name = name,
        this.description = description,
        this.dateTime = dateTime
    }
}

taskArr = [];

taskArr.readFromFile = (path, {options}) => {
    file.readFile(path, options, (error, data) => {
        console.log("Файл прочитан");
        if (error) throw error;
        console.log(data);

        let tasks = String(data).split('\n');
        for (let i = 0; i < tasks.length - 1; i++) {
            let taskDecs = tasks[i].split(',');
            taskArr.push(new Task(taskDecs[0], taskDecs[1], taskDecs[2]));
        }
    });
}

taskArr.saveToFile = (path, {options}) => {
    //var str = Array(['ff','hh']).join();
    //var el = Array(taskArr[0]);
    //var str1 = el.join("j").map();
    let taskDecs = taskArr.map(a => a.name + ',' + a.description + ',' + a.dateTime);

    file.writeFileSync(path, '', options);
    console.log("Файл перезаписан");

    for (let i = 0; i < taskDecs.length; i++) {
        //let taskDecs = Array(taskArr[i]);
        file.appendFileSync(path, taskDecs[i] + '\n', options);
        console.log("Файл записан");
    }
}

taskArr.readFromFile("storage.txt", "utf8");

module.exports = {taskArr, Task};