import express, { Request, Response } from "express";
import { Player } from "../models/player";
const router = express.Router();

router.put(
  "/api/game/updateFundingAddress",
  async (req: Request, res: Response) => {
    const { email, address } = req.body;
    try {
      const player = Player.updateOne(
        {
          email: email,
        },
        { funding_address: address }
      );
      res.status(201).send(player);
    } catch (e) {
      res.end(e);
    }
  }
);
export { router as updateFundingAddressRouter };
