const express = require('express');
const router = express.Router();
const {taskArr, Task} = require('../Model/task');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});
var sortFlag = true;

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('tasks', { title: 'Tasks', taskArr });
});

router.post('/', urlencodedParser, function (req, res) {
  var selected = req.body.sortSelect;

  console.log(`Selected value - ${selected}`);

  switch (selected) {
    case "name": {
        taskArr.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          } else
            return 1;
        });
      break;
    }
    case "description": {
        taskArr.sort((a, b) => {
          if (a.description < b.description) {
            return -1
          } else
            return 1;
        });
      break;
    }
    case "dateTime": {
      taskArr.sort((a, b) => {
        if (a.dateTime < b.dateTime) {
          return -1
        } else
          return 1;
      });
      break;
    }
    default: taskArr.saveToFile("storage.txt", "utf8");
  }
  console.log(`Sortflag = ${sortFlag}\n`);

  res.render('tasks', {title: 'Tasks', taskArr });
})

module.exports = router;
