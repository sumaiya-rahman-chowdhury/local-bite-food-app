import express from "express";
import multer from "multer";
import { storage, uploadImageToCloudinary } from "../config/cloudinary.js";
import Banner from "../models/uploads/Banner.js";
import { cloudinary } from "../config/cloudinary.js";
import { verifyToken } from "../middleares/verifyToken.js";
import verifyRole from "../middleares/verifyRole.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/banner", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch banners", details: err.message });
  }
});

router.post(
  "/banner",
  verifyToken,
  verifyRole("admin"),
  upload.array("image", 3),
  async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Upload failed" });
    }
    const uploadedImages = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    try {
      const newBanner = new Banner({ images: uploadedImages });
      await newBanner.save();

      res.status(200).json({
        images: uploadedImages,
        message: "Upload successful and saved to DB",
      });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to save to DB", details: err.message });
    }
  }
);

router.put(
  "/banner/:id",
  verifyToken,
  verifyRole(["admin"]),
  upload.array("image", 3),
  async (req, res) => {
    const { id } = req.params;
    try {
      const banner = await Banner.findById(id);
      if (!banner) {
        return res.status(404).json({ error: "Banner not found" });
      }
      for (const img of banner.images) {
        await cloudinary.uploader.destroy(img.filename);
      }
      const newImages = req.files.map((file) => ({
        url: file.path,
        filename: file.filename,
      }));
      banner.images = newImages;
      await banner.save();
      res.status(200).json({
        message: "Banner updated successfully",
        banner,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update banner", details: error.message });
    }
  }
);
router.post("/profile-picture", upload.single("avatar"), async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadImageToCloudinary(file.path);
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});
router.post("/food-picture",verifyToken, upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadImageToCloudinary(file.path);
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});
export default router;
