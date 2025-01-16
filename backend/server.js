import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.post("/menu", async (req, res) => {
    const menu = req.body;  //owner will input here

    if(!menu.name || !menu.price || !menu.description || !menu.image) {
        return res.status(400).json({ success:false, message: "Please fill in all fields" });
    }

    const newMenu = new Menu(menu);

    try{
        await newMenu.save();
        res.status(201).json({success:true, data: newMenu})
    }catch(error){
        console.error("Error occured while creating a Menu:", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
});

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port http://localhost:3000");
});

