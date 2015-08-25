var express = require('express');
var router = express.Router();

var squel = require('squel');

router.get('/', function(req, res, next) {
    var sql = squel.select()
        .from('temp', 't')
        .field('t.temperature')
        .field('t.date')
        .where('t.date < current_date')
        .limit(10);
    
    res.send(sql.toString());
});

module.exports = router;