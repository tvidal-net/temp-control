var util = require('util');
var temp = require('../util/temp');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var data = [{ datetime: new Date(), temp: temp.read() }];
    res.send(data);
});

router.get('/list', function(req, res) {
    req.db.list().then(function(data) {
        res.send(data);
    });
});

router.get('/:count', function(req, res) {
    req.db.last(req.params.count).then(function(data) {
        res.send(data);
    });
});

module.exports = router;