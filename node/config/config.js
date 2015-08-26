var env = process.env.NODE_ENV || "development";

var config = {
    development: {
        database: {
            dialect: 'sqlite',
            storage: '/opt/data/temp-control/templog.db'
        },
        development: true
    },

    production: {
        database: 'sqlite:/opt/data/temp-control/templog.db'
    }
}

module.exports = config[env];