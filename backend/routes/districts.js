import express from "express";
import { getDistricts } from "../controllers/district.controller.js";

const router = express.Router();

router.get("/", getDistricts); 

export default router;
