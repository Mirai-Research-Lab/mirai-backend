import express, { Request, Response } from "express";
import { Wallet } from "../../models/walletaddress";
import { auth } from "../../middleware/tokenauth";

const router = express.Router();

router.put(
  "/api/player/addWalletAddress",
  async (req: Request, res: Response) => {
    const { address, email } = req.body;
    try {
      console.log("inside addwallet", email);
      const wallet = Wallet.build({
        email: email.toString(),
        address: address,
      });
      await wallet.save();
      res.status(201).send("wallet added");
    } catch (e) {
      res.send(e);
    }
  }
);
export { router as setGameWalletAddressRouter };
