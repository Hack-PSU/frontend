// The build system defaults to the dev environment, which uses this file, but
// if nodejs environment variables are provided (likely by Vercel), this file will be overwritten
// during build by set-env.ts

export const environment = {
  production: true,
  api_url: 'https://api.hackpsu.org/v1/',
  api_v2_url: 'https://api.hackpsu.org/v2/',
  socket_url: 'https://api.hackpsu.org',
  firebase: {
    apiKey: 'AIzaSyCpvAPdiIcqKV_NTyt6DZgDUNyjmA6kwzU',
    authDomain: 'hackpsu18.firebaseapp.com',
    databaseURL: 'https://hackpsu18.firebaseio.com',
    projectId: 'hackpsu18',
    storageBucket: 'hackpsu18.appspot.com',
    messagingSenderId: '1002677206617',
  },

  // New code that accounts for timezone differences. Time is set for 2PM EST Saturday
  liveWebsiteGuardTime: new Date(Date.UTC(2021, 3, 9, 17, 30)),
  hackathonStartTime: new Date(Date.UTC(2022, 3, 9, 17)),
  timerStartTime: new Date(Date.UTC(2022, 3, 9, 18)),
  hackathonEndTime: new Date(Date.UTC(2022, 3, 10, 18)),
  rsvpStartTime: new Date(2019, 10),
};
