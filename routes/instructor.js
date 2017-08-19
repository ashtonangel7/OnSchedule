let express = require('express');
let router = express.Router();

let onScheduleApi = require('../modules/onScheduleApi.js');

router.get('/', function (req, res, next) {
    res.render("instructors/instructor");
});

router.get('/instructors', function (req, res, next) {
    res.render("instructors/instructor");
});

router.get('/addinstructor', function (req, res, next) {
    res.render("instructors/addinstructor");
});

router.post('/addinstructor', function (req, res) {

    let request = req.body;

    let firstName = request.firstName;
    let mobile = request.mobile;
    let email = request.email;

    if (firstName.length < 1) {
        let result = {
            status: false,
            message: "First Name is a required field."
        };
        res.render("instructors/addinstructor", result);
        return;
    }

    onScheduleApi.WriteStaff(firstName, mobile, email).then(result => {
        console.log(result);
        res.render("instructors/addinstructor", result);
    }).catch(err => {
        res.send(err);
    });
});

module.exports = router;