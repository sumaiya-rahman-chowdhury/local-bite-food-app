import express from "express";
import { verifyToken } from "../middleares/verifyToken.js";
import {
  acceptReq,
  getAllReq,
  handleFoodRequest,
} from "../controllers/request.controller.js";

const router = express.Router();

router.get("/", verifyToken, getAllReq);
router.post("/", verifyToken, handleFoodRequest);
router.post("/accept", verifyToken, acceptReq);

export default router;
