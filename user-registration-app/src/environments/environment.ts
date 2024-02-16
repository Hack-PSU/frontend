// The build system defaults to the dev environment, which uses this file, but
// if Node.js environment variables are provided (likely by Vercel), this file will be overwritten
// during build by set-env.ts

export const environment = {
  production: false,
  api_url: "https://staging-dot-hackpsu18.appspot.com/v1/",
  api_v2_url: "https://staging-v2-dot-hackpsu18.uc.r.appspot.com/v2/",
  // api_v2_url: "http://staging.hackpsu18.appspot.com/v2/",
  // api_v2_url: "http://localhost:5000/v2/",
  // api_url: "http://localhost:5000/v1/",
  // api_v3_url: "https://api-v3-production-zyiwplqi4q-uk.a.run.app/",
  api_v3_url: "http://localhost:3001/",
  // https://staging-v2-dot-hackpsu18.uc.r.appspot.com/

  firebase: {
    apiKey: "AIzaSyBG636oXijUAzCq6Makd2DNU_0WzPJRw8s",
    authDomain: "hackpsu-408118.firebaseapp.com",
    projectId: "hackpsu-408118",
    storageBucket: "hackpsu408118.appspot.com",
    messagingSenderId: "695455897614",
  },

  // New code that accounts for timezone differences. Time is set for 2PM EST Saturday
  liveWebsiteGuardTime: new Date(Date.UTC(2021, 4, 1, 17, 30)),
  hackathonStartTime: 1697911200000,
  timerStartTime: new Date(Date.UTC(2023, 1, 12, 14)),
  hackathonEndTime: 1697996700000,
  rsvpStartTime: new Date(2019, 10),
};
