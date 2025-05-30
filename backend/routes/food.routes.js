import express from "express";
import { verifyToken } from "../middleares/verifyToken.js";
import {
  createFoodPost,
  getFoodDetails,
  getFoodPost,
} from "../controllers/food.controller.js";

const router = express.Router();

router.get("/", getFoodPost);

router.post("/", verifyToken, createFoodPost);

router.get("/:id", getFoodDetails);

export default router;
