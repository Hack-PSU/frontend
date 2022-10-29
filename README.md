# HackPSU
Repository for the main website for HackPSU


## Frontend

This version of the frontend allows users to submit their information for registrations. Users can also login and view their profile. Form data is POSTed to the API, which registers the user's emails on the database. The frontend is currently live at https://hackpsu18.firebaseapp.com.

## API

The current RESTful API is live on Google Cloud Platform (GCP). The API can be accessed at https://api.hackpsu.org. The current supported routes are listed below, and documentation is available at https://api.hackpsu.org/v2/doc

## Documentation

All routes in the API must be documented properly. The documentation framework used for this project is [Apidocjs](https://apidocjs.com). See the website or current code for the syntax that needs to be followed. For each route, ensure
the following properties are included:

Name | Directive
------------ | -------------
Api path | @api
Api version | @apiVersion
Api name | @apiName
Api group | @apiGroup
Api permission | @apiPermission
Api parameters | @apiParam
On success response | @apiSuccess
On error response | @apiError



## CI

[![Vercel Logo](/website/assets/images/sponsors/powered-by-vercel.svg)](https://vercel.com?utm_source=HackPSU&utm_campaign=oss)


This repository is configured for Continuous Integration (CI) with Vercel.
The CI is programmed to run all tests for the API, and deploy the current version of the API to EB, as well as deploys the frontend from website directory to Vercel.
All production deployments to hackpsu.org and app.hackpsu.org happen on the _master_ branch. Therefore, as much as possible, commits should not be made directly to _master_. All development should be run on _dev_
and then PRed into _master_. Preview deployments to a Vercel URL happen in PRs, which help us review them faster.

To run the **tests**, run `npm test` in the main directory. </br>

## Running Locally
To compile and run the **main website**, run `npm run watch-sass` in the main directory then `python -m http.server` in the website directory. </br>
To compile run anything from **app.hackpsu.org**, run `npm run start` in the user-registration-app directory.

## Testing

Tests are Javascript files under api/test. Tests should use the [MochaJS](http://Mochajs.org) testing framework. In addition, use
[ChaiJS](http://chaijs.com) for assertions. RESTful testing also uses the mocha-typescript package formatted using [mocha-typescript](https://www.npmjs.com/package/mocha-typescript).
All PRs should include the appropriate passing tests, and should be reviewed by the Director for Technology (@rsquared226).


## Practices
- All development must happen on sub-branches of the _dev_ branch. The _master_ branch should **only** contain live and deployed production code.
- Ensure that all branches of code successfully terminate. Additionally, ensure that each such branch of execution has a unit test associated with it.
- Every API route should have appropriate passing unit tests before the code gets onto _master_
- ESLint has been configured for all code. Javascript should strictly follow the Airbnb coding standard. Run the command `npm run lint` to run the linter.
By default, ESLint will attempt to fix whatever errors possible; the rest should be handled by the developer.


### Appendix

#### Links
Resource | URL
------------ | -------------
 API | https://api.hackpsu.org/
 API Documentation | https://api.hackpsu.org/v2/doc
 API Documentation framework | https://apidocjs.com
 MochaJS | https://mochajs.org
 ChaiJS | https://chaijs.com
 CI | https://travis-ci.com

 #### ACL details
 All routes under ```/admin``` require some form of ACL permissions. These permissions are configured
 under the authentication from Firebase. To add permissions to your login, contact an administrator.


