const express = require('express');
const path = require('path');

const users = require('./routes/users');
const register = require('./routes/register');
const admin = require('./routes/admin');

const app = express();
app.use('/users', users);
app.use('/register', register);
app.use('/doc', express.static(path.join(__dirname, 'doc')));
app.use('/admin', admin);

// app.use((err, req, res) => {
//   console.log(err);
//   if (process.env.NODE_ENV !== 'test') {
//     console.error(err);
//   }
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
