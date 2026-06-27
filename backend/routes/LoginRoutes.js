import express from "express";
import { getLoginData, getSignUpData } from "../controller/Auth.js";

const router = express.Router();

router.post("/signup", getSignUpData);
router.post("/login", getLoginData);

export default router;
