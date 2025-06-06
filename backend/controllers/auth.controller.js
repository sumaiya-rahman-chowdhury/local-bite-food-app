import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      // secure: false,
      // sameSite: "lax",
      // maxAge: 1000 * 60 * 60 * 24,
    });
    return res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  console.log("Logout Succesfully");
  const token = " ";
  res.cookie("token", token, {
    httpOnly: true,
    // secure: false,
    // sameSite: "lax",
    // maxAge: 1000 * 60 * 60 * 24,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout Succesfully" });
};
