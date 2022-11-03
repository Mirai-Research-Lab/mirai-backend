import express, { Request, Response } from "express";
import { Player } from "../models/player";

const router = express.Router();

router.get("/api/players", async (req: Request, res: Response) => {
  const players = await Player.find({});

  res.send(players);
});

export { router as getOnePlayerRouter };
