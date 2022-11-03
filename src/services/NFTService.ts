import cron from "node-cron";

import { resetHighestScore } from "./resetHighestScore";
import { sendNFTsToTopScorers } from "./sendNFT";

const EVERYDAY = "0 0 * * *";

const scheduleNFTDistribution = cron.schedule(
  EVERYDAY,
  () => {
    console.log("Scheduling NFT Distribution Service...");

    resetHighestScore();
    sendNFTsToTopScorers();
  },
  {
    scheduled: false,
  }
);

export { scheduleNFTDistribution };
