import express, { Request, Response } from "express";
import { Player } from "../models/player";
import {auth} from "../middleware/tokenauth";

const router = express.Router();

router.get("/api/players", auth, async (req: Request, res: Response) => {
  const players = await Player.find({}).sort({highest_score: -1});
  
  res.send(players);
});

export { router as getAllPlayersRouter };
