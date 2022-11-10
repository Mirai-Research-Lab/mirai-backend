import express, { Request, Response } from "express";
import { Wallet } from "../models/walletaddress";
import { auth } from "../middleware/tokenauth";

const router = express.Router();

router.put(
  "/api/player/addWalletAddress",
  auth,
  async (req: Request, res: Response) => {
    const { email, address } = req.body;
    try {
      const wallet = Wallet.build({
        email: email,
        address: address,
      });
      await wallet.save();
      res.status(201).send(wallet);
    } catch (e) {
      res.send(e);
    }
  }
);
export { router as setWalletAddressRouter };
