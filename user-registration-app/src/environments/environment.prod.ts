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

  //Note: Months are indexed at 0
  liveWebsiteGuardTime: new Date(2019, 9, 31, 21),
  hackathonStartTime: new Date(2019, 10, 2, 7),
  timerStartTime: new Date(2019, 10, 2, 14),
  hackathonEndTime: new Date(2019, 10, 3, 14),
  rsvpStartTime: new Date(2019, 10),
};
