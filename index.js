/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const items = require('./routes/index')

require('dotenv').config();

const { db } = require('./db');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connection successful.');
});

const port = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

require('./models');

const indexRouter = require('./routes/index');

app.use('/', indexRouter);
app.use('/items', items )

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
