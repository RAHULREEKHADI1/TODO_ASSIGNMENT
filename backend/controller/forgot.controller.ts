import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User, { IUser } from "../model/user.model";
import nodemailer from "nodemailer";

export const forgotPassword = async (req: Request, res: Response) => {
    
  const { email } = req.body;
  console.log(email);
  

  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    
    
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
            console.log("is error come here");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Your Password",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
    });



    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("kya error catch horah. h",error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const user: IUser | null = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};