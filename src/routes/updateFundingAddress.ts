import express, { Request, Response } from "express";
import { Player } from "../models/player";

const router = express.Router();

router.put("/api/player/updateFundingAddress", async (req: Request, res: Response) => {
  const { email, address } = req.body;
  try{
    const player =await Player.updateOne({
    email:email,},
    {funding_address:address}
  );
  res.status(201).send(player);}
  catch(e)
  {
    res.send(e);
  } 
});
export { router as updateFundingAddressRouter };
