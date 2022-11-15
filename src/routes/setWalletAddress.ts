import express, { Request, Response } from "express";
import { Wallet } from "../models/walletaddress";
import { auth } from "../middleware/tokenauth";

const router = express.Router();

router.put(
  "/api/player/addWalletAddress",
  auth,
  async (req: Request, res: Response) => {
    const { address } = req.body;
    try {
      console.log("inside addwallet", req.email);
      const wallet = Wallet.build({
        email: req.email.toString(),
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
