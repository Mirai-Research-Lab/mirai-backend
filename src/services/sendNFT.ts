import { Player } from "../models/Player";

const sendNFTsToTopScorers = async () => {
  const topScorers = await Player.find({}).sort({ highestScore: -1 }).limit(10);

  console.log("Sending NFTs to top scorers...");
  console.log(topScorers);
};

export { sendNFTsToTopScorers };
