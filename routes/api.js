let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.send("I like to party");
});

module.exports = router;