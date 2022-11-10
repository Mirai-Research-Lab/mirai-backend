import express, { Request, Response } from "express";
import { Player } from "../models/player";
import {auth} from "../middleware/tokenauth";

const router = express.Router();

router.put("/api/player/updateAddress",auth, async (req: Request, res: Response) => {
  const { email, address } = req.body;
  const currentPlayer = await Player.findOne({ email: email });
  if(currentPlayer)
  currentPlayer.address?.forEach((add)=>{
    if(add===address )
    throw new Error("Address exists");
  })
  if (currentPlayer) {
    currentPlayer.update(
      { email: email }, 
      { $push: { address: address } },
  );
    if(currentPlayer.address?.length==1)
    {
      currentPlayer.set({
        funding_address: currentPlayer.address[0]
      });
      await currentPlayer.save();
    }
  } else throw new Error("User not found!");
  res.send(currentPlayer);
});
export { router as setPlayerAddressRouter };
