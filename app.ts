import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { getAllPlayersRouter } from "./src/routes/getAllPlayers";
import { getAllNftsRouter } from "./src/routes/getAllNfts";
import { getOnePlayerRouter } from "./src/routes/getOnePlayer";
import {signinRouter} from "./src/routes/Adminroutes/signin";
import {signupRouter} from "./src/routes/Adminroutes/signup";
import {signoutRouter} from "./src/routes/Adminroutes/signout";
const app = express();
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(getAllPlayersRouter);
app.use(getAllNftsRouter);
app.use(getOnePlayerRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
  throw new Error();
});

export { app };
