let express = require('express');
let router = express.Router();

let onScheduleApi = require('../modules/onScheduleApi.js');

router.get('/', function (req, res, next) {

    onScheduleApi.Test().then(function (successResult) {
        res.render('lesson', successResult);
    }, function (failResult) {
        console.log(failResult);
    });    
});

router.post('/', function (req, res) {
    res.send(req.body);
})

module.exports = router;