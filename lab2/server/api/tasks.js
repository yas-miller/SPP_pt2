const express = require('express');
const tasksRouter = express.Router();
const {v4} = require('uuid');

let auth = require('../middleware/auth');
let tasks = require('../dao/tasks');

let filters = tasks;

tasksRouter.get('/api', auth, (req, res) => {
    tasks.db.readAll().then((result) => {
        tasks.splice(0, tasks.length)
        tasks.push(...result);

        filters = tasks;

        console.log('db read')
    });

    res.status(200).json(filters.slice());
});

tasksRouter.post('/api', auth, (req, res) => {
    console.log(req.body);

    const task = { uuid: v4(), ...req.body };
    tasks.push(task);

    tasks.db.createTask(task).then(() => console.log('db updated'));
    tasks.db.updateAll(tasks).then(() => console.log('db updated'));

    res.status(201).json(task);
});

tasksRouter.put('/api/tasks/:uuid', auth, (req, res) => {
    let uuid = req.params.uuid;
    let index = tasks.findIndex(task => task.uuid === uuid);

    let task = req.body;
    tasks[index] = task;

    tasks.db.update(task, { uuid: uuid }).then(() => console.log('db updated'));

    res.status(200).json(tasks[index]);
});

tasksRouter.delete('/api/tasks/:uuid', auth, (req, res) => {
    let uuid = req.params.uuid;

    tasks = tasks.filter(task => task.uuid !== uuid);

    tasks.db.delete({ uuid: uuid }).then(() => console.log('db updated'));
    tasks.db.updateAll(tasks).then(() => console.log('db updated'));

    res.status(200).json({ message: 'Задача был удалена' });
});

tasksRouter.post('/api/filter', auth, (req, res) => {
    let _filters = { ...req.body };

    if (_filters.description.length !== 0)
        filters = tasks.filter(task => task.description === _filters.description);
    else
        filters = tasks;

    if (_filters.fromDateTime > _filters.toDateTime) {
        let s = _filters.fromDateTime;
        _filters.fromDateTime = _filters.toDateTime;
        _filters.toDateTime = s;
    }

    if ((_filters.fromDateTime.length !== 0) && (_filters.toDateTime.length !== 0))
        filters = filters.filter(task => (Date.parse(task.dateTime) >= _filters.fromDateTime) && (Date.parse(task.dateTime) <= _filters.toDateTime));

    switch (_filters.sortOption) {

        case "Name":
            console.log("Name");
            filters.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            break;

        case "Description":
            console.log("Description");
            filters.sort((a,b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0));
            break;
    }

    res.status(200).json(filters);
});

module.exports = tasksRouter;
