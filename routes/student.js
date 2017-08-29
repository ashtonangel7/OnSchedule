let express = require('express');
let jovi = require('jovi');
let onScheduleApiModule = require('../modules/onScheduleApi.js');

let router = express.Router();

let onScheduleApi = undefined;

router.use(function setAuthentication(req, res, next) {

    if (!onScheduleApi) {

        let databasePassword = jovi.decrypt(Buffer.from(req.session.databasePassword),
            req.app.locals.encryptionKey,
            Buffer.from(req.session.crypto_iv)).toString();

        onScheduleApi = new onScheduleApiModule.OnScheduleApi(
            req.session.databaseUser,
            databasePassword,
            req.session.databaseCatalog,
            req.session.databaseServer,
            true
            );
    }

    next();
});

router.get('/', function (req, res, next) {
    res.render("students/student");
});

router.get('/students', function (req, res, next) {
    res.render("students/student");
});

router.get('/addstudent', function (req, res, next) {
    res.render("students/addstudent");
});

router.post('/addstudent', function (req, res) {

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
        res.render("students/student", result);
        return;
    }

    if (lastName.length < 1) {
        let result = {
            status: false,
            message: "Last Name is a required field."
        };
        res.render("students/student", result);
        return;
    }

    if (identityNumber.length < 1) {
        let result = {
            status: false,
            message: "Last Name is a required field."
        };
        res.render("students/student", result);
        return;
    }

    onScheduleApi.WriteStudent(firstName, lastName, identityNumber, mobile, email).then(result => {
        if (result.returnValue == 0) {
            res.render("students/successstudent");
        }
    }).catch(err => {
        console.log(err);
        res.send(err);
    });   
});

module.exports = router;