import express, { Request, Response } from "express";
import { Wallet } from "../models/walletaddress";
import { auth } from "../middleware/tokenauth";

const router = express.Router();

router.post(
  "/api/wallet/checkWalletAddress",
  auth,
  async (req: Request, res: Response) => {
    try {
      const { address } = req.body;
      const email = req.email;
      const wallet = await Wallet.findOne({
        address: address,
      });
      if (!wallet) {
        res.status(201).send("Add New wallet");
      } else if (wallet.email == email) {
        res.status(201).send("Wallet exists");
      } else {
        throw new Error("Wallet address already added in other email");
      }
    } catch (e) {
      res.status(404).send(e);
    }
  }
);
export { router as checkwalletRouter };
