import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Player } from "../../models/player";
import bcrypt from "bcrypt";
import { BadRequestError, NotFoundError } from "@devion/common";
const router = express.Router();

router.post(
  "/api/auth/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const existingPlayer = await Player.findOne({ email: email });
      if (!existingPlayer) {
        throw new Error("user not found. Sign up first");
      }
      const result = await bcrypt.compare(password, existingPlayer.password);
      if (result) {
        // Generate JWT
        const PlayerJwt = jwt.sign(
          {
            email: { type: String, value: existingPlayer.email },
          },
          process.env.JWT_KEY!
        );

        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", "Content-Type, *");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.cookie("jwt", PlayerJwt, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
          path: "https://mirai-frontend.vercel.app/",
          maxAge: 604800000,
          signed: false,
        });

        res.status(200).send(existingPlayer);
      } else {
        return res.status(404).json({ message: "Invalid Credentials" });
      }
    } catch (e) {
      console.log(e);
      res.status(404).send({ message: e.message });
    }
  }
);

export { router as signinRouter };
