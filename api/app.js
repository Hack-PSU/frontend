const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const firebase = require('firebase-admin');

const v1 = require('./v1');
const index = require('./routes/index');

const serviceAccount = require('./hackpsu18-firebase-adminsdk-xf07l-ccc564f4ad');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://hackpsu18.firebaseio.com',
});
const app = express();
app.use(helmet());
app.use(helmet.hidePoweredBy());

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
app.use('/v1', v1);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log("404");
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// // error handler
// app.use((err, req, res) => {
//   if (process.env.NODE_ENV !== 'test') {
//     console.error(err);
//   }
//   console.log("Main");
//
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   if (err.body) {
//     res.send(err.body);
//   } else {
//     res.render('error');
//   }
// });

module.exports = app;
