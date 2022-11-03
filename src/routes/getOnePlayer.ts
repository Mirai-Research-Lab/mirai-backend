import express, { Request, Response } from "express";
import { Player } from "../models/player";

const router = express.Router();

router.get("/api/players", async (req: Request, res: Response) => {
  const { email } = req.body;
  const players = await Player.find({email:email});

  res.send(players);
});

export { router as getOnePlayerRouter };
