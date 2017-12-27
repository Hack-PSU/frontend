const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require("../hackpsu18-firebase-adminsdk-xf07l-ccc564f4ad");
const validator = require("email-validator");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackpsu18.firebaseio.com"
});


router.post('/pre', (req, res) => {
    if (req.body && req.body.email && validator.validate(req.body.email)) {
      let emailsRef = null;
      if (process.env.NODE_ENV === 'test') {
        emailsRef = admin.firestore().collection("pre-registrations-test").doc();
      } else {
        emailsRef = admin.firestore().collection("pre-registrations").doc();
      }
      emailsRef.set({ email: req.body.email })
      // emailsRef.get().then(doc => {
      //   if (!doc.exists) {
      //     res.status(500).send({"error": "Something went wrong."});
      //   }
      //   const temp = {"emails": doc.data().emails || []};
      //   temp["emails"].push(req.body.email);
      //   emailsRef.update(temp)
          .then(() => {
            res.status(200).send("Success");
          }).catch(err => {
          res.status(500).send(err);
        // });
      }).catch(err => {
        res.status(500).send(err);
      });
    }
    else {
      res.status(400).send({"error": "Request body must be set and must be a valid email"});
    }
  }
);

module.exports = router;