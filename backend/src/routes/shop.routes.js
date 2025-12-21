import express from "express";
import { createShop, getShops, getShopById, updateShop, deleteShop } from "../controllers/shop.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getShops);
router.post("/", protect, adminOnly, createShop);
router.get("/:id", protect, adminOnly, getShopById);
router.put("/:id", protect, adminOnly, updateShop);
router.delete("/:id", protect, adminOnly, deleteShop);

export default router;
