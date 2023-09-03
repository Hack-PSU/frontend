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
  api_v3_url: "https://api-v3-production-oz3dekgbpa-uk.a.run.app/",
  // api_v3_url: "http://localhost:3000",
  // https://staging-v2-dot-hackpsu18.uc.r.appspot.com/

  firebase: {
    apiKey: "AIzaSyAVFkHP_g2BhsHp4AMRaGnxff8rqBvtg7w",
    authDomain: "ninth-expanse-396918-9fe32.firebaseapp.com",
    projectId: "ninth-expanse-396918",
    storageBucket: "ninth-expanse-396918.appspot.com",
    messagingSenderId: "43519659979",
    appId: "1:43519659979:web:ec1a7a4e155340be70304e"
  },

  // New code that accounts for timezone differences. Time is set for 2PM EST Saturday
  liveWebsiteGuardTime: new Date(Date.UTC(2021, 4, 1, 17, 30)),
  hackathonStartTime: 1680364800000,
  timerStartTime: new Date(Date.UTC(2023, 1, 12, 14)),
  hackathonEndTime: 1680457500000,
  rsvpStartTime: new Date(2019, 10),
};
