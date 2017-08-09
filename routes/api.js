let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.send(req);
});

module.exports = router;