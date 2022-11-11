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
      console.log(existingPlayer);
      if (!existingPlayer) {
        console.log("hello1");
        throw new Error("user not found. Sign up first");
      }
      bcrypt.compare(password, existingPlayer.password, (result) => {
        try {
          if (!result) {
            console.log("Hello2");
            throw new Error("Invalid Credentials");
          }
        } catch (e) {
          console.log(e);
          return res.status(404).json({ message: e.message });
        }

        // Generate JWT
        const PlayerJwt = jwt.sign(
          {
            email: existingPlayer.email,
          },
          process.env.JWT_KEY!
        );

        // Store it on session object
        req.session = {
          jwt: PlayerJwt,
        };

        res.status(200).send(existingPlayer);
      });
    } catch (e) {
      console.log(e);
      res.status(404).send({ message: e.message });
    }
  }
);

export { router as signinRouter };
