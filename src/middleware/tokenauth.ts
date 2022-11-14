import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

async function auth(req: Request, res: Response, next: NextFunction) {
  if (req.cookies && req.cookies.jwt) {

    const token = req.cookies.jwt;

    const decoded = jwt.verify(token, process.env.JWT_KEY!);
    if (!decoded) {
      //If some error occurs
      res.status(400).json({
        error: "User not Signed in, Sign in First.",
      });
    } else {
      req.email = decoded["email"].value;
    }
    next();
  } 
  else {
    res.send({ currentuser: null });
  }
}
export { auth as auth };