import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.js";
import profileRoutes from "./routes/profile.js";
import districtRoutes from "./routes/districts.js";

dotenv.config();

connectDB();
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload-images", uploadRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/districts", districtRoutes);

// app.get("/api/prionty",(req,res)=>{
//     console.log(req.cookies);
//   res.send("Prionty...");
// })
// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
