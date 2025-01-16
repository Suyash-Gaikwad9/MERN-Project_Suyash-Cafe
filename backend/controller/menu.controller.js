import Menu from "../models/menu.model.js";
import mongoose from "mongoose";

export const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find({});
        res.status(200).json({success: true, data: menu});
    } catch (error) {
        console.log("Error while fetching menu", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
};

export const createMenu = async (req, res) => {
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
};

export const updateMenu = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid){
        return res.status(404).json({success: false, message: "Invalid Menu Id, Menu not Found"})
    }

    const menu = req.body;
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(id, menu, {new:true});
        res.status(200).json({success:true, data: updatedMenu});
    } catch (error) {
        res.status(500).json({success:false, message: "Server Error"});

    }
};

export const deleteMenu = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid){
        return res.status(404).json({success: false, message: "Invalid Menu Id, Menu not Found"})
    }

    try {
        await Menu.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Menu Deleted"});
    } catch (error) {
        console.log("Error while deleting menu", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};