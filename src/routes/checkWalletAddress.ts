import express, { Request, Response } from "express";
import { Wallet } from "../models/walletaddress";
import { auth } from "../middleware/tokenauth";

const router = express.Router();

router.post(
  "/api/wallet/checkWalletAddress",
  auth,
  async (req: Request, res: Response) => {
    const { address } = req.body;
    const email= req.email;
    try {
      const wallet = await Wallet.findOne({
        address: address,
      });
      if(!wallet)
      res.status(201).send("No user found. You can add ");
      else if(wallet.email==email)
      {
        throw new Error("Wallet address already added");
      }
    } catch (e) {
      res.send(e);
    }
  }
);
export { router as checkwalletRouter };
