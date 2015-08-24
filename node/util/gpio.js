function gpio() {
    
    var emptyResponse = { fan_status: false };

    this.read = function() {
        return this.emptyResponse;
    }

    this.mode = function() {

    };

    this.read = function() {
        return emptyResponse;
    };

    this.write = function(value) {
        return { fan_status: value };
    };

    this.on = function() {
        return write(true);
    };

    this.off = function() {
        return write(false);
    };

    return this;
};

module.exports = function(req, res, next) {
    req.gpio = gpio();
    next();
};