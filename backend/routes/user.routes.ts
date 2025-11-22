import express, { Router } from "express";
import { login, logout, register } from "../controller/user.controller";
import { forgotPassword, resetPassword } from "../controller/forgot.controller";

const router: Router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
