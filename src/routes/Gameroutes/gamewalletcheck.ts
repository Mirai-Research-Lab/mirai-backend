import express, { Request, Response } from "express";
import { Wallet } from "../../models/walletaddress";
import { auth } from "../../middleware/tokenauth";

const router = express.Router();

router.post(
  "/api/wallet/gameWalletCheck",
  async (req: Request, res: Response) => {
    const { email, address } = req.body;
    try {
      const wallet = await Wallet.findOne({
        address: address,
      });
      if (!wallet) {
        console.log("inside addwallet", email);
        const wallet = Wallet.build({
          email: email.toString(),
          address: address,
        });
        console.log(wallet);
        await wallet.save();
        res.status(201).send("Added New wallet");
      } else if (wallet.email == email) {
        res.status(201).send("Wallet exists");
      } else {
        res.status(404).send("Wallet address already added in other email");
      }
    } catch (e) {
      res.status(404).send(e);
    }
  }
);
export { router as gamecheckwalletRouter };
