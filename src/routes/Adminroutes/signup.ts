import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Player } from "../../models/player";
import { bcrypt } from "bcrypt";
const router = express.Router();

router.post(
  "/api/auth/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    const existingPlayer = await Player.findOne({ email });

    if (existingPlayer) {
      throw new Error("Email in use");
    }

    const existingUsername= await Player.findOne({username});

    if(existingUsername){
        throw new Error("Username is already in use");
      }

    const player = Player.build({ email, password, username });
    await player.save();

    // Generate JWT
    const PlayerJwt = jwt.sign(
      {
        email: player.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: PlayerJwt,
    };

    res.status(201).send(player);
  }
);

export { router as signupRouter };