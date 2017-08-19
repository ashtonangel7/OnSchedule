let express = require('express');
let router = express.Router();

let onScheduleApi = require('../modules/onScheduleApi.js');

let moment = require('moment');

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
    let endDate = moment().year(endYear).month(endMonth).date(endDay).utc().format('YYYY-MM-DDTHH:mm:ss')

    console.log(startDate);
    console.log(endDate);

    onScheduleApi.WriteContract(student, startDate, endDate, name, hourlyRate, hours).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;