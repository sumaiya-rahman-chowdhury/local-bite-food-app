import User from "../models/User.js";
import { isProfileComplete } from "../utils/isProfileComplete.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").populate("district","name");
    if (!user) return res.status(404).json({ message: "User not found" });
    const profileComplete = isProfileComplete(user);
    res.json({ user, profileComplete });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
