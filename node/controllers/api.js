var express = require('express');
var fan = require('../controllers/fan');
var temp = require('../controllers/temp');
var app = express();

app.use('/fan', fan);
app.use('/temp', temp);

module.exports = app;