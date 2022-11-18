import express, { Request, Response } from "express";
import { Player } from "../models/player";
import { auth } from "../middleware/tokenauth";
const router = express.Router();

router.post("/api/player" /* ,auth */, async (req: Request, res: Response) => {
  try {
    const email = req.email;
    const players = await Player.find({ email: email });
    return res.json({ player: players });
  } catch (e) {
    res.send(e);
  }
});

export { router as getOnePlayerRouter };
