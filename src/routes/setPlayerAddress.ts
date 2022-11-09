import express, { Request, Response } from "express";
import { Player } from "../models/player";

const router = express.Router();

router.put("/api/game/updateAddress", async (req: Request, res: Response) => {
  const { email, address } = req.body;
  const currentPlayer = await Player.findOne({ email: email });
  if (currentPlayer) {
    currentPlayer.set({
      address: address
    });
    await currentPlayer.save();
  } else throw new Error("User not found!");
  res.send(currentPlayer);
});
export { router as setPlayerAddressRouter };
