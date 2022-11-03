import express, { Request, Response } from "express";
import { Player } from "../models/player";

const router = express.Router();

router.get("/api/players", async (req: Request, res: Response) => {
  const players = await Player.find({}).sort({highest_score: -1});
  
  res.send(players);
});

export { router as getAllPlayersRouter };
