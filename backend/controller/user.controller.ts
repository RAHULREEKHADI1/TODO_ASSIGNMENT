import { Request, Response } from "express";
import User from "../model/user.model";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateTokenAndSaveInCookies } from "../jwt/token";

const userSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validation = userSchema.safeParse({ email, username, password });

    if (!validation.success) {
      const errorMessages = validation.error.issues.map(err => err.message);
      return res.status(400).json({ errors: errorMessages });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: "User already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashPassword
    });

    await newUser.save();

    // JWT + Cookie
    const token = await generateTokenAndSaveInCookies(newUser._id.toString(), res);

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

/**
 * LOGIN CONTROLLER
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    // Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }

    // Generate token + set cookie
    const token = await generateTokenAndSaveInCookies(user._id.toString(), res);

    return res.status(200).json({
      message: "User logged in successfully",
      user,
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in user" });
  }
};

/**
 * LOGOUT CONTROLLER
 */
export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
      httpOnly: true,
      sameSite: "lax"
    });

    return res.status(200).json({
      message: "User logged out successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging out" });
  }
};
