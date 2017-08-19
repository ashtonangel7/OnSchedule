let express = require('express');
let router = express.Router();

let onScheduleApi = require('../modules/onScheduleApi.js');

let moment = require('moment');

router.get('/', function (req, res, next) {
    res.render('lessons/lesson');
});

router.get('/addlesson', function (req, res, next) {

    let result = {
        customers: undefined,
        staff: undefined
    };

    onScheduleApi.GetCustomers().then(function (customerResult) {
        result.customers = customerResult;
        onScheduleApi.GetStaff().then(staffResult => {
            result.staff = staffResult;
            res.render('lessons/addlesson', result);
        });
    }, function (failResult) {
        console.log(failResult);
    });
});


router.post('/addlesson', function (req, res) {

    let request = req.body;

    let student = request.student;
    let day = request.day;
    let month = request.month;
    let year = request.year;
    let time = request.time;
    let duration = request.duration;
    let instructor = request.instructor;

    let startDate = moment().year(year).month(month).date(day).format('YYYY-MM-DDT');
    startDate = startDate + time;
    startDate = moment(startDate).utc();
    let endDate = moment(startDate).add(duration, 'minutes').format('YYYY-MM-DDTHH:mm:ss');
    startDate = startDate.format('YYYY-MM-DDTHH:mm:ss');

    let lessonData = {
        student: student,
        startDate: startDate,
        endDate: endDate,
        instructor: instructor,
        studentName: undefined,
        contracts: []
    };

    onScheduleApi.GetCustomers().then(customerResult => {

        let studentRecord = undefined;

        for(let loopStudent of customerResult) {
            if (loopStudent.id == student) {
                studentRecord = loopStudent;
            }
        };

        onScheduleApi.GetContracts().then(contractResult => {

            for(let loopContract of contractResult) {
                if (loopContract.customer_id == student) {
                    lessonData.contracts.push(loopContract);
                }
            }

            lessonData.studentName = studentRecord.first_name;
            res.render('lessons/confirmlesson', lessonData);

        }).catch(err => {
            console.log(err);
        });

        
    }).catch(err => {
        console.log(err);
    });


});

router.post('/confirmlesson', function (req, res) {

    let request = req.body;

    let student = request.student;
    let contract = request.contract;
    let instructor = request.instructor;
    let startDate = request.startDate;
    let endDate = request.endDate;

    onScheduleApi.WriteTimeBasedEvent(student, contract, startDate, endDate, instructor).then(result => {      
        if (result.returnValue == 0) {
            res.render('lessons/successlesson');
        }
    }).catch(err => {
        console.log(err);
    });    
});

module.exports = router;