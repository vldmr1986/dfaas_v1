const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');

const loginRouter = require('./routes/login');
const clustersRouter = require('./routes/clusters');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'client','build')));
app.use(express.static(path.join(__dirname, 'client','build')));

// app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/clusters', clustersRouter);

module.exports = app;
