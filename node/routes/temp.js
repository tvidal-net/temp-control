'use strict'

var temp = require('../util/temp');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var data = [{ datetime: new Date(), temp: temp.read() }];
    res.send(data);
});

router.get('/list', (req, res) =>
    req.db.list().then((data) =>
        res.send(data)));

router.get('/:count', (req, res) =>
    req.db.last({ count: req.params.count }).then((data) =>
        res.send(data)));

router.get('/:count/:hours', (req, res) => 
    req.db.last({
        count: req.params.count,
        hours: req.params.hours
    }).then((data) => res.send(data)));

module.exports = router;