import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { getAllPlayersRouter } from "./src/routes/getAllPlayers";

const app = express();
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(getAllPlayersRouter);

app.all("*", async (req, res) => {
  throw new Error();
});

export { app };
