var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send(req.fan.read());
});

router.put('/', function(req, res, next) {
    var value = req.body.fan_status;
    res.send(req.fan.write(value));
});

router.post('/', function(req, res, next) {
    res.send(req.fan.on());
});

router.delete('/', function(req, res, next) {
    res.send(req.fan.off());
});

router.get('/on', function(req, res, next) {
    res.send(req.fan.on());
});

router.get('/off', function(req, res, next) {
    res.send(req.fan.off());
});

module.exports = router;