import express, { Request, Response } from "express";
import { Player } from "../models/player";
const router = express.Router();

router.post(
  "/api/player/decrementmintcount",
  async (req: Request, res: Response) => {
    const { username } = req.body;

    try {
      const player = await Player.findOne({
        username: username,
      });

      if (!player) {
        return res.status(404).send({ message: "Player not found" });
      }

      player.set({ mintCount: player.mintCount - 1 });

      await player.save();

      res.status(201).send(player);
    } catch (e) {
      res.status(400).send({ message: "Error decrementing mint count" });
    }
  }
);

export { router as decrementMintCountRouter };
