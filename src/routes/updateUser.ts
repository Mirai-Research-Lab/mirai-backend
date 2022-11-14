import express, { Request, Response } from "express";
import { Player } from "../models/player";

const router = express.Router();

router.put("/api/player/updateuser", async (req: Request, res: Response) => {
  const { email, address, image } = req.body;
  try {
    const player = await Player.findOne({
      email: email,
    });

    if (!player) {
      return res.status(404).send({ message: "Player not found" });
    }

    if (address) {
      player.funding_address = address;
    }

    if (image) {
      player.image = image;
    }

    await player.save();

    res.status(201).send(player);
  } catch (e) {
    res.send(e);
  }
});
export { router as updateFundingAddressRouter };
