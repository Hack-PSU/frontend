const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require("../hackpsu18-firebase-adminsdk-xf07l-ccc564f4ad");
const validator = require("email-validator");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackpsu18.firebaseio.com"
});

/**
 * @api {post} /register/pre Pre-register for HackPSU
 * @apiVersion 0.0.1
 * @apiName Pre-Registration
 * @apiGroup Registration
 * @apiParam {String} email The email ID to register with
 * @apiPermission None
 *
 * @apiSuccess {String} Success
 * @apiUse IllegalArgumentError
 */
router.post('/pre', (req, res, next) => {
    if (req.body && req.body.email && validator.validate(req.body.email)) {
      let emailsRef = null;
      if (process.env.NODE_ENV === 'test') {
        emailsRef = admin.firestore().collection("pre-registrations-test").doc();
      } else {
        emailsRef = admin.firestore().collection("pre-registrations").doc();
      }
      emailsRef.set({email: req.body.email})
        .then(() => {
          res.status(200).send("Success");
        }).catch(err => {
          err.status = 500;
          next(err);
      }).catch(err => {
        err.status = 500;
        next(err);
      });
    }
    else {
      const error = new Error();
      error.body = {"error": "Request body must be set and must be a valid email"};
      error.status = 400;
      next(error);
    }
  }
);

module.exports = router;