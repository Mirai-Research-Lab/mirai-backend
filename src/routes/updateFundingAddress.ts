import express, { Request, Response } from "express";
import { Player } from "../models/player";
import { auth } from "../middleware/tokenauth";
const router = express.Router();

router.put(
  "/api/player/updateFundingAddress",
  auth,
  async (req: Request, res: Response) => {
    const { email, address } = req.body;
    try {
      const player = Player.updateOne(
        {
          email: email,
        },
        { funding_address: address }
      );
      if (!player) throw new Error("Player doesn't exist");
      res.status(201).send(player);
    } catch (e) {
      res.send(e);
    }
  }
);
export { router as updateFundingAddressRouter };
