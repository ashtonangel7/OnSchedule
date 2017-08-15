let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.send("Api");
});

router.get('/staff', function (req, res, next) {

    let staff = [{
        name: "Sonia",
        value: 0
    }, {
        name: "Lizette",
        value: 1
    }, {
        name: "David",
        value: 2
    }];

    res.send(staff);
});

module.exports = router;