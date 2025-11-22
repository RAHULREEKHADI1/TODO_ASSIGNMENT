import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../model/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.jwt;
  
  if (!token) {
    console.log("not going belo");
    
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;

    // Attach user to req object
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    next(); // Continue to next middleware
  } catch (error: any) {    
    return res.status(401).json({ message: error.message });
  }
};
