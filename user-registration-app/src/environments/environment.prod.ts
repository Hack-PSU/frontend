export const environment = {
  production: true,
  api_url: 'https://api.hackpsu.org/v1/',
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
  liveWebsiteGuardTime: new Date(2019, 2, 13, 21),
  hackathonStartTime: new Date(2019, 2, 16, 7),
  timerStartTime: new Date(2019, 2, 16, 14),
  hackathonEndTime: new Date(2019, 2, 17, 14),
  rsvpStartTime: new Date(2019, 2),
};
