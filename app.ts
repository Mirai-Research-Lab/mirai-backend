import express from "express";
import { json } from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";
import session from "express-session";
import * as dotenv from "dotenv";
import bodyparser from "body-parser";
import MongoDBStore from "connect-mongodb-session";

import { getAllPlayersRouter } from "./src/routes/getAllPlayers";
import { getAllNftsRouter } from "./src/routes/getAllNfts";
import { getOnePlayerRouter } from "./src/routes/getOnePlayer";
import { signinRouter } from "./src/routes/Adminroutes/signin";
import { signupRouter } from "./src/routes/Adminroutes/signup";
import { signoutRouter } from "./src/routes/Adminroutes/signout";
import { updateFundingAddressRouter } from "./src/routes/updateUser";
import { setPlayerAddressRouter } from "./src/routes/setPlayerAddress";
import { setWalletAddressRouter } from "./src/routes/setWalletAddress";
import { updateScoreRouter } from "./src/routes/Gameroutes/updateScore";
import { currentuserRouter } from "./src/routes/currentuser";
import { scheduleNFTDistribution } from "./src/services/NFTService";
import { checkwalletRouter } from "./src/routes/checkWalletAddress";
const app = express();

app.use(json());

dotenv.config();

// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: ["key"],
//     secret: "superSecret",
//     httpOnly: false,
//   })
// );

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}

const mongoStore = MongoDBStore(session);
const store = new mongoStore({
  uri: process.env.MONGO_URI!,
  collection: "sessions",
});

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      signed: false,
    },
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

app.use(updateScoreRouter);
app.use(getAllPlayersRouter);
app.use(getAllNftsRouter);
app.use(getOnePlayerRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(updateFundingAddressRouter);
app.use(setPlayerAddressRouter);
app.use(setWalletAddressRouter);
app.use(currentuserRouter);
app.use(checkwalletRouter);
app.all("*", async (req, res) => {
  throw new Error();
});

scheduleNFTDistribution.start();
console.log(
  "NFT Distribution service running...Scheduled to run every 10 seconds"
);

export { app };
