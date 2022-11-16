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
      console.log(currentuser);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Headers", "Content-Type, *");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.send({ currentuser: currentuser || null });
    } catch (e) {
      res.send(e);
    }
  }
);

export { router as currentuserRouter };
