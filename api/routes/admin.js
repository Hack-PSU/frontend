const express = require('express');
const authenticator = require('../helpers/auth');
const database = require('../helpers/database');

const router = express.Router();

/**
 * Administrator authentication middleware
 */
router.use((req, res, next) => {
  if (req.body.idtoken) {
    authenticator.checkAuthentication(req.body.idtoken)
      .then((decodedToken) => {
        if (decodedToken.admin === true) {
          res.locals.level = decodedToken.privilege;
          next();
        } else {
          const error = new Error();
          error.status = 401;
          error.body = { error: 'You do not have sufficient permissions for this operation' };
          next(error);
        }
      }).catch((err) => {
        const error = new Error();
        error.status = 401;
        error.body = err.message;
        next(error);
      });
  } else {
    const error = new Error();
    error.status = 401;
    error.body = { error: 'ID Token must be provided' };
    next(error);
  }
});


/**
 * @api {get} /admin/registered Get registered hackers
 * @apiVersion 0.0.1
 * @apiName Registered Hackers
 * @apiGroup Admin
 * @apiPermission Administrator
 *
 * @apiUse AuthArgumentRequired
 *
 * @apiSuccess {Array} Array of registered hackers
 */
router.get('/registered', (req, res, next) => {
  const arr = [];
  database.getRegistrations()
    .on('data', (document) => {
      if (document) {
        arr.push(document);
      }
    }).on('end', () => {
      res.status(200).send(arr);
    }).on('err', (err) => {
      const error = new Error();
      error.status = 500;
      error.body = err.message;
      next(error);
    });
});

/**
 * @api {get} /admin/preregistered Get registered hackers
 * @apiVersion 0.0.1
 * @apiName Registered Hackers
 * @apiGroup Admin
 * @apiPermission Administrator
 *
 * @apiUse AuthArgumentRequired
 *
 * @apiSuccess {Array} Array of registered hackers
 */
router.get('/preregistered', (req, res, next) => {
  const arr = [];
  database.getPreRegistrations()
    .on('data', (document) => {
      if (document) {
        arr.push(document);
      }
    }).on('end', () => {
      res.status(200).send(arr);
    }).on('err', (err) => {
      const error = new Error();
      error.status = 500;
      error.body = err.message;
      next(error);
    });
});

/**
 * @api {post} /admin/makeadmin Elevate a user's privileges
 * @apiVersion 0.0.1
 * @apiName Elevate user
 *
 * @apiGroup Admin
 * @apiPermission Administrator
 *
 * @apiUse AuthArgumentRequired
 * @apiParam {String} uid The UID of the user to elevate privileges
 * @apiParam {Number} privilege [Default = 1] The privilege level to set to {1: Volunteer, 2: Team Member, 3: Exec, 4: Tech-Exec}
 * @apiSuccess {String} Success
 * @apiUse IllegalArgumentError
 */
router.post('/makeadmin', (req, res, next) => {
  if (req.body && req.body.uid) {
    authenticator.elevate(req.body.uid, req.body.privilege ? req.body.privilege : 1)
      .then(() => {
        res.status(200).send('Success');
      })
      .catch((err) => {
        const error = new Error();
        error.status = 500;
        error.body = err.message;
        next(error);
      });
  } else {
    const error = new Error();
    error.status = 400;
    error.body = { error: 'UID must be provided' };
    next(error);
  }
});

module.exports = router;

