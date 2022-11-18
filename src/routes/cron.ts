import express, { Request, Response } from "express";
import { sendNFTsToTopScorers } from "../services/sendNFT";

const router = express.Router();

router.post("/api/cron", async (req: Request, res: Response) => {
  try {
    console.log("Running cron job...");

    sendNFTsToTopScorers();
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});
export { router as cronJobRouter };
