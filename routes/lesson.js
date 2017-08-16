let express = require('express');
let router = express.Router();

let onScheduleApi = require('../modules/onScheduleApi.js');


let lessonData = {
    title: "Lesson",
    students: [{
        name: "Ashton",
        value: 0
    }, {
        name: "Mike",
        value: 1
    }],
    instructors: [{
        name: "Sonia",
        value: 0
    }, {
        name: "Lizette",
        value: 1
    }, {
        name: "David",
        value: 2
    }]
};

router.get('/', function (req, res, next) {

    onScheduleApi.Test();

    res.render('lesson', lessonData);
});

router.post('/', function (req, res) {
    res.send(req.body);
})

module.exports = router;