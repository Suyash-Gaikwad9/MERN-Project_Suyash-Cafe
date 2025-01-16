import express from "express";
import { createMenu, deleteMenu, getMenu, updateMenu } from "../controller/menu.controller.js";

const router = express.Router();

router.get("/", getMenu);

router.post("/", createMenu);

router.put("/:id", updateMenu);

router.delete("/:id", deleteMenu);

export default router;