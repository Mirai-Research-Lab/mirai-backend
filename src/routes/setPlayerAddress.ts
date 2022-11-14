import express, { Request, Response } from "express";
import { Player } from "../models/player";
import { auth } from "../middleware/tokenauth";

const router = express.Router();

router.put(
  "/api/player/updateAddress",
  auth,
  async (req: Request, res: Response) => {
    const { address } = req.body;
    const email = req.email;
    try {
      const currentPlayer = await Player.findOne({ email: email });
      if (currentPlayer)
        currentPlayer.address?.forEach((add) => {
          if (add === address) throw new Error("Address exists");
        });
      if (currentPlayer) {
        currentPlayer.set({ address: [...currentPlayer.address, address] });
        await currentPlayer.save();
        if (currentPlayer.address?.length == 1) {
          currentPlayer.set({
            funding_address: currentPlayer.address[0],
          });
          await currentPlayer.save();
        }
      } else throw new Error("User not found!");
      res.send(currentPlayer);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
);
export { router as setPlayerAddressRouter };
