const admin = require('firebase-admin');

/**
 * Checks if the provided token is authenticated
 * @param idToken
 * @return {Promise<admin.auth.DecodedIdToken>}
 */
function checkAuthentication(idToken) {
  return new Promise((resolve, reject) => {
    admin.auth().verifyIdToken(idToken)
      .then(resolve).catch(reject);
  });
}

/**
 * Makes the provided UID an administrator with the provided provilege level
 * @param uid
 * @param privilege
 * @return {Promise<any>}
 */
function elevate(uid, privilege) {
  return new Promise((resolve, reject) => {
    admin.auth().setCustomUserClaims(uid, { admin: true, privilege })
      .then(resolve)
      .catch(reject);
  });
}


module.exports.checkAuthentication = checkAuthentication;
module.exports.elevate = elevate;
