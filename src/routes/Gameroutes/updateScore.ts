import express, { Request, Response } from "express";
import { Player } from "../../models/player";
import { auth } from "../../middleware/tokenauth";

const router = express.Router();

router.put(
  "/api/game/updateScore",
  // auth,
  async (req: Request, res: Response) => {
    const { email, score } = req.body;
    const currentPlayer = await Player.findOne({ email: email });
    if (currentPlayer) {
      currentPlayer.set({
        total_score: currentPlayer.total_score + score,
        highest_score: Math.max(currentPlayer.highest_score, score),
      });
      await currentPlayer.save();
    } else throw new Error("User not found!");
    res.send(currentPlayer);
  }
);
export { router as updateScoreRouter };
