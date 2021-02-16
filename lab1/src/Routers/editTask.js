const express = require('express');
const router = express.Router();
const {taskArr, Task} = require('../Model/task');
const bodyParser = require('body-parser');
const file = require('fs');

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post("/", urlencodedParser, (req, res) => {
    const taskName = req.body.taskNameEdit;
    let index = -1;

    console.log("Task edit = " + taskName);
    index = taskArr.findIndex(el => el.name === taskName)


    if (index !== -1){
        taskArr[index].name = req.body.newTaskName;
        taskArr[index].description = req.body.newTaskDescription;
        taskArr[index].dateTime = req.body.newTaskDateTime;

        taskArr.saveToFile("storage.txt", "utf8");
    }
    else {
        console.log("Not found");
    }

    res.render('tasks', {title: 'Tasks', taskArr});
});



module.exports = router;