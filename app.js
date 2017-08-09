let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let users = require('./routes/users');
let api = require("./routes/api.js");
let lesson = require("./routes/lesson.js");

let expressApplication = express();

// view engine setup
expressApplication.set('views', path.join(__dirname, 'views'));
expressApplication.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
expressApplication.use(logger('dev'));
expressApplication.use(bodyParser.json());
expressApplication.use(bodyParser.urlencoded({ extended: false }));
expressApplication.use(cookieParser());
expressApplication.use(express.static(path.join(__dirname, 'public')));

expressApplication.use('/', index);
expressApplication.use('/users', users);
expressApplication.use("/api", api);
expressApplication.use("/lesson", lesson);

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
