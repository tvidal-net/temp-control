'use strict'

var sh = require('shelljs');

function GPIO(pin, mode) {

    if (!(this instanceof GPIO)) {
        return new GPIO(pin, mode);
    }

    var emptyResponse = { fan_status: false };

    var cmd = '/usr/local/bin/gpio -1';

    if (mode === undefined) {
        mode = 'output';
    }

    this.mode = (mode) => sh.exec(cmd + ' mode ' + this.pin + ' ' + mode);

    this.read = () => {
        var options = { silent: true };
        var child = sh.exec(cmd + ' read ' + this.pin, options);
        var output = child.output;
        var data = parseInt(output.trim());
        return { fan_status: data != 0 };
    }

    this.write = (value) => {
        sh.exec(cmd + ' write ' + this.pin + ' ' + ~~value);
        return { fan_status: !!value };
    }

    this.on = () => this.write(true);

    this.off = () => this.write(false);

    this.pin = pin;
    this.mode(mode);
}

module.exports = GPIO;
