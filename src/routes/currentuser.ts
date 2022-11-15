import express, { Request, Response } from "express";
import { Player } from "../models/player";
import { auth } from "../middleware/tokenauth";
const router = express.Router();

router.get(
  "/api/auth/currentuser",
  auth,
  async (req: Request, res: Response) => {
    const email = req.email;
    try {
      const currentuser = await Player.find({ email: email });
      console.log(currentuser)
      res.send({ currentuser: currentuser || null });
    } catch (e) {
      res.send(e);
    }
  }
);

export { router as currentuserRouter };
