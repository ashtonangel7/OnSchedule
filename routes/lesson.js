let express = require('express');
let router = express.Router();

let lessonData = {
    title: "Lesson",
    students: ["Ashton", "Mike"]
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('lesson', lessonData);
});

module.exports = router;