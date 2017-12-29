const admin = require('firebase-admin');

/**
 * @return {Stream} Returns a continuous stream of data from the database
 */
function getRegistrations() {
  return admin.firestore().collection('registered-hackers').stream();
}

/**
 * @return {Stream} Returns a continuous stream of data from the database
 */
function getPreRegistrations() {
  return admin.firestore().collection('pre-registered').stream();
}


module.exports.getRegistrations = getRegistrations;
module.exports.getPreRegistrations = getPreRegistrations;