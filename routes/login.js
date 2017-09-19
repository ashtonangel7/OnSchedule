let express = require('express');
let jovi = require('jovi');
let uuidv4 = require('uuid/v4');

let router = express.Router();

let onScheduleApiModule = require('../modules/onScheduleApi.js');
let onScheduleApi = new onScheduleApiModule.OnScheduleApi("EntryPointLogin", "juqG9GmysSxjkAn", "OnSchedule", "powersoft.database.windows.net", true);

router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/', function (req, res, next) {

    let userName = req.body.userName;
    let password = req.body.password;

    onScheduleApi.AuthenticateUser(userName, password).then(result => {

        if (result.length > 0) {

            req.session.userId = result[0].id;
            req.session.tenantId = result[0].tenant_id;
            req.session.isAuthenticated = true;
            req.session.databaseServer = result[0].database_server;
            req.session.databaseCatalog = result[0].database_catalog;
            req.session.databaseUser = result[0].database_user;

            if (!result[0].crypto_hash) {

                let encryptResult = jovi.encrypt(result[0].database_password, result[0].crypto_key);

                req.session.databasePassword = encryptResult.hash;
                req.session.crypto_iv = encryptResult.iv;
                req.app.locals.encryptionKey = result[0].crypto_key;

                onScheduleApi = new onScheduleApiModule.OnScheduleApi(result[0].database_user,
                    result[0].database_password,
                    result[0].database_catalog,
                    result[0].database_server,
                    true);
                
                onScheduleApi.UpdateUser(result[0].id, result[0].tenant_id, encryptResult.hash, encryptResult.iv).then(result => {
                    console.log(result);
                }).catch(err => {
                    console.log(err);
                });
            }
            else {
                req.session.databasePassword = result[0].crypto_hash;
                req.session.crypto_iv = result[0].crypto_iv;
                req.app.locals.encryptionKey = result[0].crypto_key;
            }

            res.redirect('../');
            return;
        }

        res.render('login', {message: "That is not the right user / email or password, please try again or hit forgot password."});

    }).catch(err => {
        console.log(err);
    });
});

router.get('/forgotPassword', function (req, res, next) {
    res.render('forgotPassword');
});

router.post('/forgotPassword', function (req, res, next) {

    let request = req.body;
    let userName = request.email;  

    let resetCode = uuidv4();

    onScheduleApi.SetPasswordResetCode(userName, resetCode).then(result => {

        console.log(result);
        res.send(result);

    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;