import jwt from "jsonwebtoken";
import { Response } from "express";
import User from "../model/user.model";

interface JwtPayload {
  userId: string;
}

export const generateTokenAndSaveInCookies = async (
  userId: string,
  res: Response
): Promise<string> => {
  try {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      throw new Error("JWT_SECRET_KEY is missing in environment variables");
    }

    // Generate JWT
    const token = jwt.sign({ userId } as JwtPayload, secret, {
      expiresIn: "10d",
    });

    // Set cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      path: "/",
      domain: process.env.COOKIE_DOMAIN || undefined,
    });

    // Save token to user document
    await User.findByIdAndUpdate(userId, { token });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
