import express, { Request, Response } from "express";
import { Wallet } from "../models/walletaddress";

const router = express.Router();

router.put("/api/game/updateAddress", async (req: Request, res: Response) => {
  const { email, address } = req.body;
  try{const wallet =Wallet.build({
    email:email,
    address:address
  });
  await wallet.save();
  res.status(201).send(wallet);}
  catch(e)
  {
    res.end(e);
  } 
});
export { router as setWalletAddressRouter };
