import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import menuRoutes from "./routes/menu.route.js"

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept json data in the req.body

app.use("/api/menu/", menuRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port http://localhost:" + PORT);
});

