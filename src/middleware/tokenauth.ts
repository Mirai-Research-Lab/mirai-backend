import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

async function auth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.token) {
    const token = req.session.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY!);
    if (!decoded) {
      //If some error occurs
      res.status(400).json({
        error: "User not Signed in, Sign in First.",
      });
    } else {
      console.log(decoded);
    }
    next();
  } else {
    next(new Error("No session token"));
  }
}
export { auth as auth };
