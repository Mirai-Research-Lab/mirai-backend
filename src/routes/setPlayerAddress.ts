import express, { Request, Response } from "express";
import { Player } from "../models/player";
import { auth } from "../middleware/tokenauth";

const router = express.Router();

router.put(
  "/api/player/updateAddress",
  auth,
  async (req: Request, res: Response) => {
    try {
      const { address } = req.body;
      const email = req.email;
      const currentPlayer = await Player.findOne({ email: email });
      if (currentPlayer)
        currentPlayer.address?.forEach((add) => {
          if (add === address) res.status(201).send("Address exists");
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
      res.status(400).send({ data: e });
    }
  }
);
export { router as setPlayerAddressRouter };
