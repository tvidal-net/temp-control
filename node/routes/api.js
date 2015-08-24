var express = require('express');
var router = express.Router();

router.get('/fan', function(req, res, next) {
    res.send(req.gpio.read());
});

router.put('/fan', function(req, res, next) {
    var value = req.body.fan_status;
    var result = req.gpio.write(value);
    res.send(result);
});

router.post('/fan', function(req, res, next) {
    res.send(req.gpio.on());
});

router.delete('/fan', function(req, res, next) {
    res.send(req.gpio.off());
});

router.get('/fan/on', function(req, res, next) {
    res.send(req.gpio.on());
});

router.get('/fan/off', function(req, res, next) {
    res.send(req.gpio.off());
});

module.exports = router;