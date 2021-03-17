// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_url: 'https://staging-dot-hackpsu18.appspot.com/v1/',
  api_v2_url: 'http://staging.hackpsu18.appspot.com/v2/',
  // api_v2_url: 'http://localhost:5000/v2/',
  // api_url: 'http://localhost:5000/v1/',
  firebase: {
    apiKey: 'AIzaSyAWejnwBUrfUoULnMRumGFpOchYjjHlfTI',
    authDomain: 'hackpsu18-staging.firebaseapp.com',
    databaseURL: 'https://hackpsu18-staging.firebaseio.com',
    projectId: 'hackpsu18-staging',
    storageBucket: 'hackpsu18-staging.appspot.com',
    messagingSenderId: '614592542726',
  },
  // Note: Months are indexed at 0
  liveWebsiteGuardTime: new Date(2021, 2, 12, 9),
  hackathonStartTime: new Date(2021, 2, 19, 16),
  timerStartTime: new Date(2021, 2, 19, 17),
  hackathonEndTime: new Date(2021, 2, 21, 17),
  rsvpStartTime: new Date(2019, 10),
};
