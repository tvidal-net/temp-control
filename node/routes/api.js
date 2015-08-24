var express = require('express');
var router = express.Router();

router.get('/fan', function(req, res, next) {
    res.send(req.fan.read());
});

router.put('/fan', function(req, res, next) {
    var value = req.body.fan_status;
    res.send(req.fan.write(value));
});

router.post('/fan', function(req, res, next) {
    res.send(req.fan.on());
});

router.delete('/fan', function(req, res, next) {
    res.send(req.fan.off());
});

router.get('/fan/on', function(req, res, next) {
    res.send(req.fan.on());
});

router.get('/fan/off', function(req, res, next) {
    res.send(req.fan.off());
});

module.exports = router;