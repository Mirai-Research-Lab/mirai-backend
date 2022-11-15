import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Player } from "../../models/player";
const router = express.Router();
import { validateRequest, BadRequestError } from "@devion/common";

router.post(
  "/api/auth/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(req.body);
    const { email, password, username } = req.body;
    try {
      const existingPlayer = await Player.findOne({ email: email });

      if (existingPlayer) {
        throw new BadRequestError("Email in use");
      }

      const existingUsername = await Player.findOne({ username: username });

      if (existingUsername) {
        throw new BadRequestError("Username is already in use");
      }

      const player = Player.build({
        email: email,
        password: password,
        username: username,
        total_score: 0,
        highest_score: 0,
      });
      await player.save();

      // Generate JWT
      const PlayerJwt = jwt.sign(
        {
          email: { type: String, value: player.email },
        },
        process.env.JWT_KEY!
      );

      res.cookie("jwt", PlayerJwt);

      res.status(201).send(player);
    } catch (e) {
      res.status(404).send(e);
    }
  }
);

export { router as signupRouter };
