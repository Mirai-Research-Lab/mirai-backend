import express from "express";
import { json } from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";
import * as dotenv from "dotenv";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
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
import { currentuserRouter } from "./src/routes/currentuser";
const app = express();

app.use(json());

dotenv.config();

app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
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
app.use(currentuserRouter);

app.all("*", async (req, res) => {
  throw new Error();
});

scheduleNFTDistribution.start();
console.log(
  "NFT Distribution service running...Scheduled to run every 10 seconds"
);

export { app };
