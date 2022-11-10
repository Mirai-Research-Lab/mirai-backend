import express from "express";
import { json } from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";
import * as dotenv from "dotenv";
import bodyparser from "body-parser";
import Moralis from "moralis/.";
import { EvmChain } from "@moralisweb3/evm-utils";

import { getAllPlayersRouter } from "./src/routes/getAllPlayers";
import { getAllNftsRouter } from "./src/routes/getAllNfts";
import { getOnePlayerRouter } from "./src/routes/getOnePlayer";
import { signinRouter } from "./src/routes/Adminroutes/signin";
import { signupRouter } from "./src/routes/Adminroutes/signup";
import { signoutRouter } from "./src/routes/Adminroutes/signout";
import { updateFundingAddressRouter } from "./src/routes/updateFundingAddress";
import { setPlayerAddressRouter } from "./src/routes/setPlayerAddress";
import { setWalletAddressRouter } from "./src/routes/setWalletAddress";
import { updateScoreRouter } from "./src/routes/Gameroutes/updateScore";

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
app.use(
  cors({
    // origin: ["http://localhost:3000/", "http://127.0.0.1:3000/"],
  })
);
app.use(
  bodyparser.urlencoded({
    extended: true,
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
app.use(updateFundingAddressRouter);
app.use(updateScoreRouter);
app.use(setPlayerAddressRouter);
app.use(setWalletAddressRouter);

app.all("*", async (req, res) => {
  throw new Error();
});

scheduleNFTDistribution.start();
console.log(
  "NFT Distribution service running...Scheduled to run everyday at 12:00 AM"
);

export { app };
