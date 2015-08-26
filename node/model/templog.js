var config = require('../config/config.js');
var Sequelize = require('sequelize');
var util = require('util');

var cnn = new Sequelize('database', 'username', 'password', config.database);

var templog = cnn.define("templog", {

    datetime: {
        field: 'timestamp',
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true
    },

    temp: {
        field: 'temp',
        type: Sequelize.DECIMAL(6, 3),
        allowNull: false
   }

}, {
    timestamps: true,
    updatedAt: false,
    createdAt: 'datetime',
    tableName: 'temps',

    defaultScope: {
        order: 'timestamp DESC',
        limit: 10
    }
});

function TempLog() {

    this.list = function() {
        return templog.findAll();
    }

    this.last = function(count) {
        return templog.findAll({ limit: count });
    }
}

var db = new TempLog();

module.exports = function(req, res, next) {
    req.db = db;
    next();
}
