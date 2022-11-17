import { ethers } from "ethers";
import dotenv from "dotenv";

import { Player } from "../models/player";
import { resetHighestScore } from "./resetHighestScore";
import { incrementMintCount } from "./incrementMintCount";

import { default as networkMapping } from "../../constants/networkMapping.json";
import { default as GameContractAbi } from "../../constants/frontEndAbiLocation/GameContract.json";

dotenv.config();

const sendNFTsToTopScorers = async () => {
  const networkId = process.env.NETWORK_ID || "5";

  const providerRPC = {
    goerli: {
      name: "goerli",
      rpc: process.env.GOERLI_RPC_URL,
      chainId: 5,
    },
  };

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
  // intialize ethers
  const provider = new ethers.providers.JsonRpcProvider(providerRPC.goerli.rpc);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contractAddress = networkMapping[networkId]["GameContract"][0]; // todo: change [0] -> .slice(-1)[0] before deployment

  const GameContract = new ethers.Contract(
    contractAddress,
    GameContractAbi,
    wallet
  );

  // distribute Ethers among top scorers
  const topScorersAddresses = topScorers.map(
    (player) => player.funding_address
  );
  const allAddressesValid =
    topScorersAddresses[0] && topScorersAddresses[1] && topScorersAddresses[2];

  const highestScoreAboveZero =
    topScorers[0].highest_score > 0 &&
    topScorers[1].highest_score > 0 &&
    topScorers[2].highest_score > 0;

  try {
    if (
      topScorersAddresses.length > 2 &&
      allAddressesValid &&
      highestScoreAboveZero
    ) {
      console.log("Sending ETH to top scorers...");

      const tx = await GameContract.distributeToken(
        topScorersAddresses[0],
        topScorersAddresses[1],
        topScorersAddresses[2]
      );
      await tx.wait(1);

      resetHighestScore();
      console.log(
        "Ethers sent to top scorers...Top Score reset...Restarting game..."
      );

      console.log("Incrementing mintCount for top scorers...");
      const player1Updated = await incrementMintCount(topScorers[0].username);
      const player2Updated = await incrementMintCount(topScorers[1].username);
      const player3Updated = await incrementMintCount(topScorers[2].username);

      if (player1Updated && player2Updated && player3Updated) {
        console.log("mintCount incremented for top scorers.");
      } else {
        console.log("mintCount failed to increment for top scorers...");
      }
    } else {
      if (!highestScoreAboveZero || topScorersAddresses.length < 3) {
        console.log("Not enought players...");
      }

      if (!allAddressesValid) {
        console.log(
          "All Wallet Addresses not valid...Addresses: \n",
          topScorersAddresses
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export { sendNFTsToTopScorers };
