import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Player } from "../../models/player";
import bcrypt from "bcrypt";
import { BadRequestError } from "@devion/common";
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
    console.log(req.body);
    const { email, password } = req.body;

    const existingPlayer = await Player.findOne({ email: email });

    if (!existingPlayer) {
      throw new BadRequestError("User does not exist. Signup first");
    }

    bcrypt.compare(existingPlayer.password, password, (err, result) => {
      if (err) {
        throw new BadRequestError(
          "Invalid Credentials. Enter correct password"
        );
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
  }
);

export { router as signinRouter };
