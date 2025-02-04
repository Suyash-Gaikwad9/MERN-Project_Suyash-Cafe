import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";

import menuRoutes from "./routes/menu.route.js"

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept json data in the req.body

// Check if MONGO_URI is correctly loaded
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file!");
    process.exit(1);  // Exit process to prevent running without a DB connection
  }
  
  // Connect to MongoDB
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
  
  

app.use("/api/menu/", menuRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port http://localhost:" + PORT);
});

