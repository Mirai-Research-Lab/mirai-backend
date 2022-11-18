import express, { Request, Response } from "express";
import { Player } from "../models/player";
import { auth } from "../middleware/tokenauth";

const router = express.Router();

router.get("/api/players", async (req: Request, res: Response) => {
  try {
    const players = await Player.find({}).sort({
      highest_score: -1,
      updatedAt: 1,
    });

    res.send(players);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
});

export { router as getAllPlayersRouter };
