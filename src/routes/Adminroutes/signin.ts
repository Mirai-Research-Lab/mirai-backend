import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Player } from "../../models/player";
import { bcrypt } from "bcrypt";

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
    const { email, password} = req.body;

    const existingPlayer = await Player.findOne({ email });

    if (!existingPlayer) {
      throw new Error("Invalid credentials");
    }

    const passwordsMatch = await bcrypt.compare(
        existingPlayer.password,
        password
      );
      if (!passwordsMatch) {
        throw new Error("Invalid Credentials");
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
  }
);

export { router as signinRouter };

