'use strict'

var express = require('express');
var fan = require('../routes/fan');
var temp = require('../routes/temp');
var app = express();

app.use('/fan', fan)
    .use('/temp', temp);

module.exports = app;