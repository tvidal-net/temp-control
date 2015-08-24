var sh = require('shelljs');

function GPIO(pin, mode) {

    var emptyResponse = { fan_status: false };

    var cmd = '/usr/local/bin/gpio -1';

    if (mode === undefined) {
        mode = 'output';
    }

    this.mode = function(mode) {
        sh.exec(cmd + ' mode ' + this.pin + ' ' + mode);
    }

    this.read = function() {
        var options = { silent: true };
        var child = sh.exec(cmd + ' read ' + this.pin, options);
        var output = child.output;
        console.log('Output: ' + output);
        
        var data = parseInt(output.trim());
        // sh.exec(cmd + ' read ' + this.pin, options, function(code, output) {
        //     if (code == 0) {
        //         console.log('Code: ' + code);
        //         console.log('Output: ' + output.trim());
        //         data = parseInt(output.trim());
        //     }
        // });
        console.log('Data: ' + data);
        return { fan_status: data != 0 };
    }

    this.write = function(value) {
        sh.exec(cmd + ' write ' + this.pin + ' ' + ~~value);
        return { fan_status: value };
    }

    this.on = function() {
        return this.write(true);
    }

    this.off = function() {
        return this.write(false);
    }

    this.pin = pin;
    this.mode(mode);
}

exports.Super = GPIO;