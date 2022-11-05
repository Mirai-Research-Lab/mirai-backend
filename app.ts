import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import * as dotenv from "dotenv";

import Moralis from "moralis/.";
import { EvmChain } from "@moralisweb3/evm-utils";

import { getAllPlayersRouter } from "./src/routes/getAllPlayers";
import { getAllNftsRouter } from "./src/routes/getAllNfts";
import { getOnePlayerRouter } from "./src/routes/getOnePlayer";
import { signinRouter } from "./src/routes/Adminroutes/signin";
import { signupRouter } from "./src/routes/Adminroutes/signup";
import { signoutRouter } from "./src/routes/Adminroutes/signout";

import { scheduleNFTDistribution } from "./src/services/NFTService";

const app = express();

app.use(json());

dotenv.config();

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// * Moralis initialization
// const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
// const ADDRESS = process.env.CONTRACT_ADDRESS;
// const chain = EvmChain.ETHEREUM;

// const startServer = async () => {
//   await Moralis.start({
//     apiKey: "xxx",
//   });
// };

// startServer();

app.use(getAllPlayersRouter);
app.use(getAllNftsRouter);
app.use(getOnePlayerRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
  throw new Error();
});

scheduleNFTDistribution.start();
console.log(
  "NFT Distribution service running...Scheduled to run everyday at 12:00 AM"
);

export { app };
