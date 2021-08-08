import { writeFile } from 'fs';

// Only overwrite environment.ts if nodejs environment variables have been provided
if (!process.env.PRODUCTION === undefined) {
  const colors = require('colors');
  require('dotenv').load();
  const targetPath = './src/environments/environment.ts';
  const targetPath2 = './src/environments/environment.prod.ts';

  const envConfigFile = `export const environment = {
    production: '${process.env.PRODUCTION}',
    api_url: '${process.env.API_BASE_URL}',
    api_v2_url: '${process.env.API_URL}',
    firebase: {
      apiKey: '${process.env.API_KEY}',
      authDomain: '${process.env.AUTH_DOMAIN}',
      databaseURL: '${process.env.DATABASE_URL}',
      projectId: '${process.env.PROJECT_ID}',
      storageBucket: '${process.env.STORAGE_BUCKET}',
      messagingSenderId: '${process.env.MESSAGING_SENDER_ID}',
    }
    liveWebsiteGuardTime: new Date('${process.env.LIVE_WEBSITE_GUARD_TIME}'),
    hackathonStartTime: new Date('${process.env.HACKATHON_START_TIME}'),
    timerStartTime: new Date('${process.env.TIMER_START_TIME}'),
    hackathonEndTime: new Date('${process.env.HACKATHON_END_TIME}'),
    rsvpStartTime: new Date('${process.env.RSVP_START_TIME}'),
  };
  `;
  console.log(
    colors.magenta('The file `environment.ts` will be written with the following content: \n')
  );
  console.log(colors.grey(envConfigFile));
  writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
      throw console.error(err);
    } else {
      console.log(
        colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`)
      );
    }
  });
  writeFile(targetPath2, envConfigFile, function (err) {
    if (err) {
      throw console.error(err);
    } else {
      console.log(
        colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`)
      );
    }
  });
}
