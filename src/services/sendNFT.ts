import ethers from "ethers";
import dotenv from "dotenv";

import { Player } from "../models/Player";
import { resetHighestScore } from "./resetHighestScore";
import networkMapping from "../../constants/networkMapping.json";
import GameContractAbi from "../../constants/frontEndAbiLocation/GameContract.json";

dotenv.config();

const sendNFTsToTopScorers = async () => {
  const networkId = process.env.NETWORK_ID || "5";

  if (!process.env.PRIVATE_KEY) {
    throw new Error("No private key found");
  }

  const topScorers = await Player.find()
    .sort({ highestScore: -1, updatedAt: 1 })
    .limit(3);

  console.log(
    "The top scorers are: \n",
    topScorers.map((player) => player.username)
  );
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

  // distribute Ethers among top scorers
  const topScorersAddresses = topScorers.map(
    (player) => player.funding_address
  );
  try {
    if (topScorersAddresses.length > 2) {
      const tx = await GameContract.distributeToken(
        topScorers.map((player) => player.address)
      );
      await tx.wait(1);

      resetHighestScore();
      console.log(
        "Ethers sent to top scorers...Top Score reset...Restarting game..."
      );
    } else {
      console.log(
        "Not enough players to distribute NFTs...Players Count: ",
        topScorersAddresses.length
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export { sendNFTsToTopScorers };
