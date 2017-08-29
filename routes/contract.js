let express = require('express');
let jovi = require('jovi');
let moment = require('moment');
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
    res.render('contracts/contract');
});

router.get('/addcontract', function (req, res, next) {

    onScheduleApi.GetCustomers().then(customerResult => {

        let result = {
            customers: customerResult
        };

        res.render('contracts/addcontract', result);
    }).catch(err => {
        console.log(err);
    });
});

router.post('/addcontract', function (req, res, next) {

    let request = req.body;

    let student = request.student;
    let startDay = request.startday;
    let startMonth = request.startmonth;
    let startYear = request.startyear;
    let endDay = request.startday;
    let endMonth = request.startmonth;
    let endYear = request.startyear;
    let name = request.name;
    let hourlyRate = request.hourlyRate;
    let hours = request.hours;

    if (name.length < 1) {
        let result = {
            status: false,
            message: "Last Name is a required field."
        };
        res.send(result);
        return;
    }

    if (hourlyRate.length < 1) {
        let result = {
            status: false,
            message: "Last Name is a required field."
        };
        res.send(result);
        return;
    }

    let startDate = moment().year(startYear).month(startMonth).utc().format('YYYY-MM-DDTHH:mm:ss');
    let endDate = moment().year(endYear).month(endMonth).date(endDay).utc().format('YYYY-MM-DDTHH:mm:ss');

    let contractData = {
        student: student,
        startDate: startDate,
        endDate: endDate,
        name: name,
        hourlyRate: hourlyRate,
        hours: hours,
        studentName: undefined
    };

    onScheduleApi.GetCustomers().then(customerResult => {

        for (let customer of customerResult) {

            if (customer.id == student) {
                contractData.studentName = customer.first_name;
                break;
            }
        }

        res.render('contracts/confirmcontract', contractData);
    }).catch(err => {
        console.log(err);
    });



});

router.post('/confirmcontract', function (req, res, next) {

    let request = req.body;

    onScheduleApi.WriteContract(request.student, request.startDate, request.endDate, request.name, request.hourlyRate, request.hours).then(result => {
        if (result.returnValue == 0) {
            res.render('contracts/successcontract');
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;