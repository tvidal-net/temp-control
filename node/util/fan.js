var gpio = require('../util/gpio');

function Fan() {

    var pin = 40;
    var mode = 'output';

    gpio.Super.call(this, pin, mode);
}
Fan.prototype = Object.create(gpio.Super.prototype);
Fan.prototype.constructor = Fan;

Fan.call(exports);

module.exports = function(req, res, next) {
    req.fan = exports;
    next();
}