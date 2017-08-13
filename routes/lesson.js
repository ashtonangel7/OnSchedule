let express = require('express');
let router = express.Router();

let lessonData = {
    title: "Lesson",
    students: ["Ashton", "Mike"],
    startTimes: ["08:00","09:00","10:00","11:00"]
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('lesson', lessonData);
});

module.exports = router;