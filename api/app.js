const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const firebase = require('firebase-admin');
const cors = require('cors');

const app = express();


const whitelist = /^((https:\/\/)?((.*)\.)?hackpsu.(com|org))$/;
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (whitelist.test(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all cross-origin requests for now
    }
  },
};

const index = require('./routes/index');
const users = require('./routes/users');
const register = require('./routes/register');
const admin = require('./routes/admin');


const serviceAccount = require('./hackpsu18-firebase-adminsdk-xf07l-ccc564f4ad');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://hackpsu18.firebaseio.com',
});
app.use(helmet());
app.use(helmet.hidePoweredBy());

if (process.env.NODE_ENV !== 'test') {
  app.use(cors(corsOptions));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(logger('combined')); // 'combined' outputs the Apache style LOGs
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/v1/users', users);
app.use('/v1/register', register);
app.use('/v1/doc', express.static(path.join(__dirname, 'doc')));
app.use('/v1/admin', admin);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (err.body) {
    res.send(err.body);
  } else {
    res.render('error');
  }
});

module.exports = app;
