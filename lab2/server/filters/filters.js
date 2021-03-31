const express = require('express');
const filterRouter = express.Router();

let tasks = require('../dao/tasks');

filterRouter.post('/api/sort', (req, res) => {

});

module.exports = filterRouter;
