import cron from "node-cron";

import { sendNFTsToTopScorers } from "./sendNFT";

const EVERYDAY = "*/10 * * * * *"; // every day at midnight
// "* * * * *" for every minute, and for every 10 seconds "*/10 * * * * *"

const scheduleNFTDistribution = cron.schedule(
  EVERYDAY,
  () => {
    console.log("Running cron job...");

    sendNFTsToTopScorers();
  },
  {
    scheduled: false,
  }
);

export { scheduleNFTDistribution };
