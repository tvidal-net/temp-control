var GPIO = require('../util/gpio');

var pin = 40;
var mode = 'output';

function Fan() {
    GPIO.call(this, pin, mode);
}
Fan.prototype = Object.create(GPIO.prototype);
Fan.prototype.constructor = Fan;

var fan = Fan();

module.exports = function(req, res, next) {
    req.fan = fan;
    next();
}