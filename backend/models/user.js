import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    phone: { type: String },
    avatarUrl: { type: String },
    location: { type: String },
    district: { type: mongoose.Schema.Types.ObjectId, ref: "District" },
    specificLocation: { type: String },
    type: { type: String, default: "buyer", enum: ["buyer", "hotel-owner"] },
    stars: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
