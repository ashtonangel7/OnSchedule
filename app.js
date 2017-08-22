let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let logger = require('morgan');
let session = require('express-session');

let index = require('./routes/index');
let users = require('./routes/users');
let api = require("./routes/api.js");
let lesson = require("./routes/lesson.js");
let student = require("./routes/student.js");
let instructor = require("./routes/instructor.js");
let contract = require("./routes/contract.js");
let login = require("./routes/login.js");

let expressApplication = express();

// view engine setup
expressApplication.set('views', path.join(__dirname, 'views'));
expressApplication.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
expressApplication.use(logger('dev'));
expressApplication.use(bodyParser.json());
expressApplication.use(bodyParser.urlencoded({ extended: false }));
expressApplication.use(express.static(path.join(__dirname, 'public')));
expressApplication.use(session({
    secret: '9CVSwc8jrGj8ehS',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));


let checkAuthenticated = function (req, res, next) {

    if (!req.session.isAuthenticated && req.url != '/login') {
        res.redirect('../login');
        return;
    }
    next();
};

expressApplication.use(checkAuthenticated);

expressApplication.use('/', index);
expressApplication.use('/users', users);
expressApplication.use("/api", api);
expressApplication.use("/lessons", lesson);
expressApplication.use("/students", student);
expressApplication.use("/instructors", instructor);
expressApplication.use("/contracts", contract);
expressApplication.use("/login", login);


// catch 404 and forward to error handler
expressApplication.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
expressApplication.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = expressApplication;
