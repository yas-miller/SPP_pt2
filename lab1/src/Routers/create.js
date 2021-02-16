const express = require('express');
const router = express.Router();
const {taskArr, Task} = require('../Model/task');
const bodyParser = require('body-parser');
const file = require('fs');


const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res) => {
    res.render('create', {title: 'Create task'})
});


router.post('/',urlencodedParser, (req, res) => {
    if (req.body.taskName.length !== 0 && req.body.taskDescription.length !== 0 && req.body.taskDateTime.length !== 0) {

        taskArr.push(new Task(
            req.body.taskName,
            req.body.taskDescription,
            req.body.taskDateTime));

        taskArr.saveToFile("storage.txt", "utf8");

        //let string = `${req.body.TaskName}|${req.body.Description}\n`;

        res.redirect('/tasks')
    }
    else {
        res.redirect('/create')
    }


});

module.exports = router;
