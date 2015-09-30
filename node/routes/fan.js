'use strict'

var express = require('express');
var router = express.Router();

router
    .get('/', (req, res) => res.send(req.fan.read()))
    .post('/', (req, res) => res.send(req.fan.on()))
    .delete('/', (req, res) => res.send(req.fan.off()))
    .get('/on', (req, res) => res.send(req.fan.on()))
    .get('/off', (req, res) => res.send(req.fan.off()))
    .put('/', (req, res) => {
        console.log(req.body);
        var value = req.body.fan_status;
        res.send(req.fan.write(value));
    });

module.exports = router;