import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js"
import { verifyToken } from "../middleares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getProfile);
router.put("/", verifyToken, updateProfile);

export default router;
