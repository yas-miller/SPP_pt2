const express = require('express');
const app = express();

require('dotenv').config();

const cookie_parser = require('cookie-parser');
const path = require('path');
const body_parser = require('body-parser');
const cors = require('cors');

//let api = require('./model/pilots_model');

const regRouter = require('./server/reg/reg');
const tasksRouter = require('./server/api/tasks');
//const filterRouter = require('./server/filters/filters');

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(express.json());
app.use(cookie_parser());
app.use(cors());

app.use(regRouter);
app.use(tasksRouter);

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    console.log("get page");
    res.sendFile(__dirname + "/client/index.html");
});

app.listen(80, () => {
    console.log("Server is started");
});