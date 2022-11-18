import express, { Request, Response } from "express";
import { Player } from "../models/player";
const router = express.Router();
import { auth } from "../middleware/tokenauth";
import cloudinary from "../config/cloudinaryConfig";
import upload from "../config/multer.filefilter.config";
router.post(
  "/api/player/updateuser",
  auth,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { address } = req.body;
      const email = req.email;
      const result = req.file
        ? await cloudinary.uploader.upload(req.file.path)
        : null;
      const player = await Player.findOne({
        email: email,
      });

      if (!player) {
        return res.status(404).send({ message: "Player not found" });
      }
      if (result) {
        player.image = result.secure_url;
      }
      if (address) {
        player.funding_address = address;
      }
      await player.save();

      res.status(201).send(player);
    } catch (e) {
      res.send(e);
    }
  }
);
export { router as updateFundingAddressRouter };
