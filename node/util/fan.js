'use strict'

var GPIO = require('../util/gpio');

var pin = 40;
var mode = 'output';

function Fan() {
    if (!(this instanceof Fan)) {
        return new Fan();
    }

    GPIO.call(this, pin, mode);
}
Fan.prototype = Object.create(GPIO.prototype);
Fan.prototype.constructor = Fan;

var fan = new Fan();

module.exports = (req, res, next) => {
    req.fan = fan;
    next();
}