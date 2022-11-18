import express from "express";
import { json } from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyparser from "body-parser";
import multer from "multer";
import cookieParser from "cookie-parser";
import { getAllPlayersRouter } from "./src/routes/getAllPlayers";
import { getOnePlayerRouter } from "./src/routes/getOnePlayer";
import { signinRouter } from "./src/routes/Adminroutes/signin";
import { signupRouter } from "./src/routes/Adminroutes/signup";
import { signoutRouter } from "./src/routes/Adminroutes/signout";
import { updateFundingAddressRouter } from "./src/routes/updateUser";
import { setPlayerAddressRouter } from "./src/routes/setPlayerAddress";
import { setWalletAddressRouter } from "./src/routes/setWalletAddress";
import { updateScoreRouter } from "./src/routes/Gameroutes/updateScore";
import { scheduleNFTDistribution } from "./src/services/NFTService";
import { currentuserRouter } from "./src/routes/currentuser";
import { checkwalletRouter } from "./src/routes/checkWalletAddress";
import { gameSetAddressRouter } from "./src/routes/Gameroutes/gameupdateaddress";
import { gamecheckwalletRouter } from "./src/routes/Gameroutes/gamewalletcheck";
import { gamesigninRouter } from "./src/routes/Adminroutes/game-signin";
import { decrementMintCountRouter } from "./src/routes/decrementMintCount";
import { cronJobRouter } from "./src/routes/cron";

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
app.use(updateFundingAddressRouter);
app.use(getAllPlayersRouter);
app.use(getOnePlayerRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(updateScoreRouter);
app.use(setPlayerAddressRouter);
app.use(setWalletAddressRouter);
app.use(currentuserRouter);
app.use(checkwalletRouter);
app.use(gameSetAddressRouter);
app.use(gamecheckwalletRouter);
app.use(gamesigninRouter);
app.use(decrementMintCountRouter);
app.use(cronJobRouter);

app.all("*", async (req, res) => {
  try {
    res.status(404).send({ message: "Route not found" });
  } catch (e) {
    console.log(e);
    console.log({ error: e.message });
  }
});

scheduleNFTDistribution.start();
console.log(
  // "NFT Distribution service running...Scheduled to run everyday at 12 am"
  "NFT Distribution service running...Scheduled to run every 15 minutes"
);

export { app };
