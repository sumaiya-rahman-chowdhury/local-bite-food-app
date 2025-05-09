import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.js";

// Load env vars
dotenv.config();

// Connect to DB
connectDB();
//
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload-images", uploadRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
