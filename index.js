import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import userRoutes from "./routes/authenticationRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import userProfileRoutes from "./routes/userProfileRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();

app.use(cors());
dbConnection();

app.use(express.json());

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/profile", userProfileRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
