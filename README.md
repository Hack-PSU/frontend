# hackpsuS2018
Repository for the main website for HackPSU Spring 2018

[![Build Status](https://travis-ci.com/hackpsu-tech/hackPSUS2018.svg?token=rXBswytuwgwFX9F967pp&branch=master)](https://travis-ci.com/hackpsu-tech/hackPSUS2018)
## Frontend

This version of the frontend contains a simple submission form for pre-registrations. Form data is POSTed to the API, which registers the user's emails on the database. The frontend is currently live at https://hackpsu18.firebaseapp.com. This should change once hosting is switched over.

## API

The current RESTful API is live on an ElasticBeanstalk (EB) instance on Amazon Web Services (AWS). The API can be accessed at https://api.hackpsu.org/v1. The current supported routes are listed below, and documentation is available at https://api.hackpsu.org/v1/doc

## CI

This repository is configured for Continuous Integration (CI) with Travis CI. Click the above Build Status link for more details on the last build. 
The CI is programmed to run all tests for the API, and deploy the current version of the API to EB, as well as deploys the frontend from website directory to Firebase.
All deployments happen on the master branch. Therefore, as much as possible, commits should not be made directly to master. All development should be run on dev
and then PRed into master. 

## Testing

Testing is handled by the CI platform Travis-CI. Tests are Javascript files under api/test. Tests should use the [MochaJS](http://Mochajs.org) testing framework. In addition, use 
[ChaiJS](http://chaijs.com) for assertions. RESTful testing is handled by the [chai-http](http://chaijs.com/plugins/chai-http/) module.
All PRs should include the appropriate passing tests, and should be reviewed by the Director for Technology (@sushshring or @mdh5389).

### Appendix
Resource | URL
------------ | -------------
 API | https://api.hackpsu.org/v1
 API Doc | https://api.hackpsu.org/v1/doc
 MochaJS | https://mochajs.org
 ChaiJS | https://chaijs.com
 CI | https://travis-ci.com