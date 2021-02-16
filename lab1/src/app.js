const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./Routers/index');
const tasksRouter = require('./Routers/tasks');
const createRouter = require('./Routers/create');
const deleteRouter = require('./Routers/deleteTask');
const editRouter = require('./Routers/editTask');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/create', createRouter);
app.use('/delete_task', deleteRouter);
app.use('/edit_task', editRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(80, 'localhost');

module.exports = app;
