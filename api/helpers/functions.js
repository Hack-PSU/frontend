/* eslint-disable max-len */
const request = require('request');
const constants = require('./constants');

/**
 * This function substitutes the provided
 * @param {String} html A string of HTML text that forms the body of the email. All substitutables must be formatted as $substitutable$. The HTML MUST contain the $NAME$ substitutable.
 * @param {String} name The name of the recipient
 * @param {Object} [substitutions] A map of strings with the following format { keyword-to-substitute: string-to-substitute-with, ... }; Example: { date: "09-23-2000" }
 * @return {String} HTML string with the words properly substituted
 */
module.exports.emailSubstitute = function emailSubstitute(html, name, substitutions) {
  let subHTML = html.replace(/\$name\$/g, name);
  Object.entries(substitutions).forEach((substitution) => {
    subHTML = subHTML.replace(new RegExp(`\\$${substitution[0]}\\$`, 'g'), substitution[1]);
  });
  return subHTML;
};

/**
 * Makes the POST request to the email server URL
 * @param options Contains the options for the POST request. For schema, refer to function createEmailRequest or the SendInBlue API
 * @return {Promise<any>}
 */
module.exports.sendEmail = function sendEmail(options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

/**
 * This generates the proper email send POST request format
 * @param {String} email The email ID to send the email to
 * @param {String} htmlContent HTML to be included in the email
 * @param {String} subject The subject of the email
 * @param {String} name The name of the recipient
 * @return {Object} { data, options }
 */
module.exports.createEmailRequest = function createEmailRequest(email, htmlContent, subject, name) {
  const data = {
    to: [{ email, name }],
    sender: {
      email: 'team@hackpsu.org',
      name: 'HackPSU Team',
    },
    subject,
    htmlContent,
    replyTo: { email: 'team@hackpsu.org' },
  };
  const options = {
    method: 'POST',
    url: constants.emailServerUrl,
    body: data,
    headers: {
      'api-key': process.env.SENDINBLUE_API_KEY,
    },
    json: true,
  };
  return {
    data,
    options,
  };
};
