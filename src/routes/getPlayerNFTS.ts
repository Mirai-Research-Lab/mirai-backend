import express, { Request, Response } from "express";
import { Nft } from "../models/nft";

const router = express.Router();

router.get("/api/Nfts", async (req: Request, res: Response) => {
  const { address } = req.body;
  const Nfts = await Nft.find({Owner: address});

  res.send(Nfts);
});

export { router as getPlayerNftsRouter };
