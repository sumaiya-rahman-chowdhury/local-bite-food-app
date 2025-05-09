import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/banner", upload.array("image", 3), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Upload failed" });
  }
  const uploadedImages = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  res.status(200).json({
    images: uploadedImages,
    message: "Upload successful",
  });
});

export default router;
