import cron from "node-cron";

import { sendNFTsToTopScorers } from "./sendNFT";

const EVERYDAY = "*/15 * * * *"; // every day at midnight
// "* * * * *" for every minute, and for every 10 seconds "*/10 * * * * *"

const scheduleNFTDistribution = cron.schedule(
  EVERYDAY,
  () => {
    console.log("Scheduling NFT Distribution Service...");

    sendNFTsToTopScorers();
  },
  {
    scheduled: false,
  }
);

export { scheduleNFTDistribution };
