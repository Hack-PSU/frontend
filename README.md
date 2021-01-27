# HackPSU Fall 2020
Repository for the main website for HackPSU Fall 2020


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

<a href="https://vercel.com?utm_source=HackPSU&utm_campaign=oss">
  Powered by
  <svg width="78" height="16" viewBox="0 0 283 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" fill="#fff"/></svg>
</a>

This repository is configured for Continuous Integration (CI) with Vercel.
The CI is programmed to run all tests for the API, and deploy the current version of the API to EB, as well as deploys the frontend from website directory to Vercel.
All production deployments to hackpsu.org and app.hackpsu.org happen on the _master_ branch. Therefore, as much as possible, commits should not be made directly to _master_. All development should be run on _dev_
and then PRed into _master_. Preview deployments to a Vercel URL happen in PRs, which help us review them faster.

To run the **tests**, run `npm test` in the main directory. </br>

## Running Locally
To compile and run the **main website**, run `npm run watch-sass` then `python -m http.server` in the main directory. </br>
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


