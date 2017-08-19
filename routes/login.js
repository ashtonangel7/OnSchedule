let express = require('express');
let router = express.Router();

let onScheduleApi = require('../modules/onScheduleApi.js');

router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/', function (req, res, next) {
    res.cookie('session', {
        user: 'fdd',
        instructor: 'a',
        student: 'b',
        tenant: 'd'
    }, {
    });

    res.send(req.cookies);
});

module.exports = router;