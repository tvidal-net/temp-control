var sh = require('shelljs');

var deviceList = '/sys/bus/w1/devices/28*';
var deviceName = '/w1_slave';
var fileReadOptions = { encoding: 'utf8' };
var deviceFile = sh.ls(deviceList).shift();

module.exports = {
    read: function() {
        if (deviceFile) {
            var fileName = deviceFile + deviceName;
            var data = fs.readFileSync(fileName, fileReadOptions).split('\n');
            if (data[0].split(' ').pop() == 'YES') {
                var temp = data[1].split('=').pop();
                return parseFloat(temp) / 1000;
            }
        }
        return null;
    }
}