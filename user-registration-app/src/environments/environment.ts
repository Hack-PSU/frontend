// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_url: 'https://staging-dot-hackpsu18.appspot.com/v1/',
  firebase: {
    apiKey: 'AIzaSyCpvAPdiIcqKV_NTyt6DZgDUNyjmA6kwzU',
    authDomain: 'hackpsu18.firebaseapp.com',
    databaseURL: 'https://hackpsu18-test.firebaseio.com',
    projectId: 'hackpsu18',
    storageBucket: 'hackpsu18.appspot.com',
    messagingSenderId: '1002677206617',
  },
  // hackathonStartTime: new Date(2018, 10,6, 7),
  hackathonStartTime: new Date(),
  timerStartTime: new Date(2018, 9, 6, 12),
  hackathonEndTime: new Date(2018, 9, 7, 12),
  rsvpStartTime: new Date(),
  // hackathonStartTime: new Date(2018, 10, 6, 7),
  // rsvpStartTime: new Date(2018, 9, 30),
};
