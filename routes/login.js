let express = require('express');
let router = express.Router();

let onScheduleApi = require('../modules/onScheduleApi.js');

router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/', function (req, res, next) {

    let userName = req.body.userName;
    let password = req.body.password;

    onScheduleApi.AuthenticateUser(userName, password).then(result => {
        console.log(result);

        if (result.length > 0) {
            req.session.userId = result[0].id;
            req.session.tenantId = result[0].tenant_id;
            req.session.isAuthenticated = true;
            res.redirect('../');
            return;
        }

        res.render('login');

    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;