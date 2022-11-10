import express, { Request, Response } from "express";
import { Player } from "../models/player";
import {auth} from "../middleware/tokenauth";
const router = express.Router();

router.post("/api/player"/* ,auth */, async (req: Request, res: Response) => {
  const { email } = req.body;
  try
  {const players = await Player.find({email:email});
  res.send(players);}
  catch(e)
  {
    res.send(e);
  }
});

export { router as getOnePlayerRouter };
