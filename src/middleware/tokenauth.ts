import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

async function auth(req: Request, res: Response, next) {
  if (req.session && req.session.token) {
    const token = req.session.token;
    const decoded = await jwt.verify(
      token,
      process.env.JWT_KEY!,
      (err, decoded) => {
        if (err) {
          //If some error occurs
          res.status(400).json({
            error: "User not Signed in, Sign in First.",
          });
        } else {
          console.log(decoded);
        }
      }
    );
    next();
  } else {
    next(new Error("No session token"));
  }
}
