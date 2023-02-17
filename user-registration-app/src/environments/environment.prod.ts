// These are here for reference.
// To change the actual prod environment variables, adjust the values for Vercel's production environment

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

  // Note: Months are indexed at 0

  // New code that accounts for timezone differences. Time is set for 2PM EST Saturday
  liveWebsiteGuardTime: new Date(Date.UTC(2022, 3, 9, 17, 30)),
  hackathonStartTime: new Date(Date.UTC(2023, 3, 1, 14)),
  timerStartTime: new Date(Date.UTC(2022, 1, 12, 14)),
  hackathonEndTime: new Date(Date.UTC(2023, 3, 2, 14)),
  rsvpStartTime: new Date(2019, 10),
};
