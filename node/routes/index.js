"use strict";

var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');

/* GET home page. */
router.get('/', function(req, res) {

    var chain = new Sequelize.Utils.QueryChainer();
    chain
        .add(req.db.last({ hours: 24 }))
        .add(req.db.last({ hours: 1 }))
        .run()
        .success(function(results) {
            res.render('index', {
                title: 'Raspberry Pi Temperature Logger',
                data: results[0],
                script: JSON.stringify(results[1])
            });
        });
});

module.exports = router;
