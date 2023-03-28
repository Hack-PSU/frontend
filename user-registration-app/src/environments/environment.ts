// The build system defaults to the dev environment, which uses this file, but
// if Node.js environment variables are provided (likely by Vercel), this file will be overwritten
// during build by set-env.ts

export const environment = {
  production: false,
  api_url: 'https://staging-dot-hackpsu18.appspot.com/v1/',
  api_v2_url: 'https://staging-v2-dot-hackpsu18.uc.r.appspot.com/v2/',
  // api_url: 'http://localhost:5000/v1/',
  // api_v2_url: 'http://localhost:5000/v2/',
  // https://staging-v2-dot-hackpsu18.uc.r.appspot.com/

  firebase: {
    apiKey: 'AIzaSyAWejnwBUrfUoULnMRumGFpOchYjjHlfTI',
    authDomain: 'hackpsu18-staging.firebaseapp.com',
    databaseURL: 'https://hackpsu18-staging.firebaseio.com',
    projectId: 'hackpsu18-staging',
    storageBucket: 'hackpsu18-staging.appspot.com',
    messagingSenderId: '614592542726',
  },

  // New code that accounts for timezone differences. Time is set for 2PM EST Saturday
  liveWebsiteGuardTime: new Date(Date.UTC(2021, 4, 1, 17, 30)),
  hackathonStartTime: new Date(Date.UTC(2023, 3, 1, 16)),
  timerStartTime: new Date(Date.UTC(2023, 1, 12, 14)),
  hackathonEndTime: new Date(Date.UTC(2023, 3, 2, 14)),
  rsvpStartTime: new Date(2019, 10),
};
