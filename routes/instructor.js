let express = require('express');
let router = express.Router();

let onScheduleApi = require('../modules/onScheduleApi.js');

router.get('/', function (req, res, next) {
    res.render("instructor");
});

router.post('/', function (req, res) {
    res.send(req.body);
});

module.exports = router;