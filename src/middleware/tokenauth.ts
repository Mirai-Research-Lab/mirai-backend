import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

async function auth(req: Request, res: Response, next: NextFunction) {
  console.log(req.headers.cookies);
  if (
    req.headers &&
    req.headers.cookies &&
    req.headers.cookies !== "jwt=undefined"
  ) {
    const token = req.headers.cookies.toString().split("=")[1];
    const decoded = jwt.verify(token.toString(), process.env.JWT_KEY!);
    if (!decoded) {
      //If some error occurs
      res.status(400).json({
        error: "User not Signed in, Sign in First.",
      });
    } else {
      req.email = decoded["email"].value;
    }
    next();
  } else {
    res.send({ currentuser: null });
  }
}
export { auth as auth };
