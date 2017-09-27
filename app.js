var express = require('express');
var orm = require('orm');
var path = require('path');
var favicon = require('serve-favicon');
var fs = require('fs')
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var components = require('./routes/components');
var websites = require('./routes/websites');
var plugins = require('./routes/plugins');
var rfs = require('rotating-file-stream')
var app = express();

var sessionConfig = require('./config/session');
var dbconfig = require('./config/db');
app.use(orm.express('mysql://'+dbconfig.username+':'+dbconfig.password+'@'+dbconfig.host+':'+dbconfig.port+'/'+dbconfig.database+'?dateStrings='+dbconfig.dateStrings+'&pool='+dbconfig.pool+'&debug='+dbconfig.debug));

var logDirectory = path.join(__dirname, '../logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});
app.use(morgan('combined', {stream: accessLogStream}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.locals.user = req.session.user || null;
  next();
});
app.use('/', index);
app.use('/users', users);
app.use('/components', components);
app.use('/websites', websites);
app.use('/plugins', plugins);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
