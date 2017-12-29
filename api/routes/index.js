const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).set('content-type', 'application/json').send({ response: 'Welcome to HackPSU 2018. Make sure you have your credentials!' });
});

module.exports = router;
