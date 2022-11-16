import express, { Request, Response } from "express";
import { Player } from "../../models/player";
import { auth } from "../../middleware/tokenauth";

const router = express.Router();

router.put(
  "/api/player/updateAddress",
  async (req: Request, res: Response) => {
    const { email ,address } = req.body;
    try {
      const currentPlayer = await Player.findOne({ email: email });
      if (currentPlayer)
        currentPlayer.address?.forEach((add) => {
          if (add === address) res.status(400).send("Address exists");
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
      } else res.status(400).send("User not found!");
      res.send(currentPlayer);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
);
export { router as gameSetAddressRouter };
