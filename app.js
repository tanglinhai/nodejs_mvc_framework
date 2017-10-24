const express = require('express');
const orm = require('orm');
const path = require('path');
const favicon = require('serve-favicon');
const fs = require('fs')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const rfs = require('rotating-file-stream');

const index = require('./routes/index');
const learn_index = require('./routes/learn/index');
const components = require('./routes/learn/components');
const websites = require('./routes/learn/websites');
const plugins = require('./routes/learn/plugins');
const login = require('./routes/users/login');
const register = require('./routes/users/register');
const users = require('./routes/users/users');

const app = express();

const sessionConfig = require('./config/session');
const dbconfig = require('./config/db');
app.use(orm.express('mysql://'+dbconfig.username+':'+dbconfig.password+'@'+dbconfig.host+':'+dbconfig.port+'/'+dbconfig.database+'?dateStrings='+dbconfig.dateStrings+'&pool='+dbconfig.pool+'&debug='+dbconfig.debug));

const logDirectory = path.join(__dirname, '../logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs('access.log', {
  size:     '10M',
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
app.use((req, res, next)=>{
  res.locals.user = req.session.user || null;
  next();
});
app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/users', users);
app.use('/learn', learn_index);
app.use('/learn/components', components);
app.use('/learn/websites', websites);
app.use('/learn/plugins', plugins);

// catch 404 and forward to error handler
app.use((req, res, next)=>{
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)=>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('uncaughtException', (err) => {
  logger.error('捕获到错误',err);
});

module.exports = app;
