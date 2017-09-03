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

router.get('/studentrecord', function (req, res, next) {

    let result = {
        customers: undefined
    };

    onScheduleApi.GetCustomers().then(function (customerResult) {
        result.customers = customerResult;
        res.render("students/studentrecord", result);
    }).catch(err => {
        console.log(err);
    });
});

router.post('/studentrecord', function (req, res) {
    let request = req.body;
    let student = request.student;

    onScheduleApi.GetCustomerContractRecord(student).then(function (result) {

        let customers = {
            customers: result
        }

        res.render("students/studentrecordview", customers);
    }).catch(err => {
        console.log(err);
    });
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

router.post("/studentrecordviewlessons", function (req, res, next) {
    let request = req.body;

    let customer = request.customer;
    let tenant_id = request.tenant_id;
    let contract = request.contract;

    onScheduleApi.GetCustomerRecord(contract).then(result => {

        let lessons = {
            lessons: result
        };

        res.render('students/studentviewlessons', lessons);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;