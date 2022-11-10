import ethers from "ethers";
import dotenv from "dotenv";

import { Player } from "../models/Player";
import networkMapping from "../../constants/networkMapping.json";
import GameContractAbi from "../../constants/frontEndAbiLocation/GameContract.json";

dotenv.config();

const sendNFTsToTopScorers = async () => {
  const networkId = process.env.NETWORK_ID || "5";

  if (!process.env.PRIVATE_KEY) {
    throw new Error("No private key found");
  }

  // TODO sort with respect to 1. highest score 2. update time
  const topScorers = await Player.find({})
    .sort({ highestScore: -1 /*, LastUpdated: 1*/ })
    .limit(3);

  console.log(topScorers);
  console.log("Sending NFTs to top scorers...");

  // intialize ethers
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.GOERLI_RPC_URL
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contractAddress = networkMapping[networkId].GameContract.slice(-1)[0];
  const GameContract = new ethers.Contract(
    contractAddress,
    GameContractAbi,
    wallet
  );

  // call the distributeToken function and pass the address of the top scorers
  try {
    const tx = await GameContract.distributeToken(
      topScorers.map((player) => player.address)
    );
    await tx.wait(1);
  } catch (err) {
    console.log(err);
  }

  console.log("Ethers sent to top scorers");
};

export { sendNFTsToTopScorers };
