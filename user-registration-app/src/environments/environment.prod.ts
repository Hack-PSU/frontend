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
  // TODO: Manually set this and push the day of hackathon because of time zone differences.
  /*
  liveWebsiteGuardTime: new Date(2021, 2, 21, 17),
  hackathonStartTime: new Date(2021, 2, 19, 16),
  timerStartTime: new Date(2021, 2, 19, 17),
  hackathonEndTime: new Date(2021, 2, 21, 17),
  rsvpStartTime: new Date(2019, 10),
  */

  //New code that accounts for timezone differences. Time is set for 5PM EST Friday
  liveWebsiteGuardTime: new Date(Date.UTC(2021, 2, 19, 15)),
  hackathonStartTime: new Date(Date.UTC(2021, 2, 19, 20)),
  timerStartTime: new Date(Date.UTC(2021, 2, 19, 21)),
  hackathonEndTime: new Date(Date.UTC(2021, 2, 21, 21)),
  rsvpStartTime: new Date(2019, 10),
};
