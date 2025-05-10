import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  images: [
    {
      url: String,
      filename: String,
    },
  ],
});

export default mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
