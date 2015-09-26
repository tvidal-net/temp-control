"use strict";

var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');

/* GET home page. */
router.get('/', function(req, res) {

    var data = {};

    req.db.last({hours:24}).then(function(result) {
        data.day = result;
        return req.db.last({hours:1});
    }).then(function(result) {
        data.hour = result;
        res.render('index', {
            title: 'Raspberry Pi Temperature Logger',
            tableData: data.hour,
            chartData: JSON.stringify(data.day),
            fan_status: req.fan.read().fan_status
        });
    });

});

module.exports = router;
