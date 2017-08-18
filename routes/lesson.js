let express = require('express');
let router = express.Router();

let onScheduleApi = require('../modules/onScheduleApi.js');

router.get('/', function (req, res, next) {

    let result = {
        customers: undefined,
        staff: undefined
    };

    onScheduleApi.GetCustomers().then(function (customerResult) {
        result.customers = customerResult;
        onScheduleApi.GetStaff().then(staffResult => {
            result.staff = staffResult;
            res.render('lesson', result);
        });
    }, function (failResult) {
        console.log(failResult);
    });    
});


router.post('/', function (req, res) {
    res.send(req.body);
});

module.exports = router;