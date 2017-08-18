let express = require('express');
let router = express.Router();

let onScheduleApi = require('../modules/onScheduleApi.js');

router.get('/', function (req, res, next) {
    res.render("student");
});

router.post('/', function (req, res) {

    let requestBody = req.body;

    let firstName = requestBody.firstName;
    let lastName = requestBody.lastName;
    let identityNumber = requestBody.identityNumber;
    let mobile = requestBody.mobile;
    let email = requestBody.email;

    if (firstName.length < 1) {
        let result = {
            status: false,
            message: "First Name is a required field."
        };
        res.render("student", result);
        return;
    }

    if (lastName.length < 1) {
        let result = {
            status: false,
            message: "Last Name is a required field."
        };
        res.render("student", result);
        return;
    }

    if (identityNumber.length < 1) {
        let result = {
            status: false,
            message: "Last Name is a required field."
        };
        res.render("student", result);
        return;
    }

    onScheduleApi.WriteStudent(firstName, lastName, identityNumber, mobile, email).then(result => {
        if (result.returnValue == 0) {
            res.send(req.body);
        }
    }).catch(err => {
        console.log(err);
        res.send(err);
    });   
});

module.exports = router;