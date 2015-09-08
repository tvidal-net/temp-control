"use strict";

var config = require('../config/config.js');
var Sequelize = require('sequelize');

var cnn = new Sequelize('', '', '', config.database);

var templog = cnn.define('templog', {

    timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true,
    },

    temp: {
        type: Sequelize.DECIMAL,
        allowNull: false
   }

}, {
    timestamps: true,
    updatedAt: false,
    createdAt: 'timestamp',
    tableName: 'temps',

    defaultScope: {
        order: 'timestamp DESC'
    }
});

function TempLog() {

    this.list = function() {
        return templog.findAll({ limit: 10 });
    }

    this.last = function(params) {

        var scopes = ['defaultScope'];

        var count = parseInt(params.count);
        if (!isNaN(count)) {
            scopes.push({ limit: count });
        }

        var hours = parseInt(params.hours);
        if (!isNaN(hours)) {
            var whereClause = "timestamp >= datetime('now', '-" + hours + " hours', 'localtime')";
            scopes.push({ where: [whereClause] });
        }

        return templog.scope(scopes).findAll();
    }

    // cnn.sync({ force: true });
}

var db = new TempLog();

module.exports = function(req, res, next) {
    req.db = db;
    next();
}
