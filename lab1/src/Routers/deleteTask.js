const express = require('express');
const router = express.Router();
const {taskArr, Task} = require('../Model/task');
const bodyParser = require('body-parser');
const file = require('fs');

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post("/",urlencodedParser, (req, res) => {
    const taskName = req.body.taskName;
    let index = -1;

    index = taskArr.findIndex(el => el.name === taskName)

    if (index !== -1) {
        taskArr.splice(index)

        taskArr.saveToFile("storage.txt", "utf8");

        console.log("Deleted")
    }
    else {
        console.log("Not found");
    }

    res.render('tasks', {title: 'Tasks', taskArr});
});

module.exports = router;
