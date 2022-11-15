import express, { Request, Response } from "express";
import { Player } from "../models/player";
const router = express.Router();
import { auth } from "../middleware/tokenauth";
import cloudinary from "../config/cloudinaryConfig";
import upload from "../config/multer.filefilter.config";
router.post(
  "/api/player/updateuser",
  /* auth,*/ upload.single("image"),
  async (req: Request, res: Response) => {
    const { email, address } = req.body;
    console.log(req.body)
    const result = req.file
      ? await cloudinary.uploader.upload(req.file.path)
      : null;
    console.log(result)
    try {
      const player = await Player.findOne({
        email: email,
      });

      if (!player) {
        return res.status(404).send({ message: "Player not found" });
      }

      if (!address) {
        return res.status(400).send({ message: "Wallet not Connected" });
        player.funding_address = address;
      }

      if (result) {
        player.image = result.secure_url;
      }

      await player.save();

      res.status(201).send(player);
    } catch (e) {
      res.send(e);
    }
  }
);
export { router as updateFundingAddressRouter };
