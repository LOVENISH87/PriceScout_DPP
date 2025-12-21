import express from "express";
import {
    createProduct,
    getProducts,
    getLowestPrices,
    getAllPricesForProduct,
    deleteProduct,
    getProductById,
    updateProduct,
    getProductsByShop
} from "../controllers/product.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, adminOnly, createProduct);
router.get("/", getProducts);
router.get("/lowest", getLowestPrices);
router.get("/prices/:name", getAllPricesForProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.get("/shop/:shopId", getProductsByShop);
router.get("/:id", protect, adminOnly, getProductById);
router.put("/:id", protect, adminOnly, updateProduct);

export default router;
