const {v4} = require('uuid');

const BaseDAO = require('../dao/mySQL');
const {Tasks, Task} = require('../model/tasks');

const path = require("path");
const properties = require('properties-reader')(path.join(__dirname, '../properties.properties'));

class TasksDAO extends Tasks {
    constructor() {
        super();
        this.db = new BaseDAO(properties.getRaw('mysql.table1'));
        //this.db.table = 'tasks';

        //MySQL.create(data)
        this.db.createTask = async (task) => {
            const test = this.db.create([task]).then((result) => {
                console.log('db value added');
                return result;
            }).catch(error => console.log(error));
            console.log(test);
            return test;
        }
    }
}

let tasks = new TasksDAO();
//tasks.push(new Task(v4(),"Tidy the room", "Tidy the room", "2021-03-16T16:26"));

module.exports = tasks;
