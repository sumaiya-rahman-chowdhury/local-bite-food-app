import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.js";
import profileRoutes from "./routes/profile.js";
import districtRoutes from "./routes/districts.js";
import foodPostRoutes from "./routes/food.routes.js";
import foodRequestRoutes from "./routes/request.routes.js";
import paymentRoutes from "./routes/payment.stripe.js";
import cartRoutes from "./routes/cart.routes.js";

dotenv.config();

connectDB();
const app = express();
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend-domain.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload-images", uploadRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/food-marketplace/post", foodPostRoutes);
app.use("/api/request", foodRequestRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
