import express from "express";
import { createProduct, getProducts, getLowestPrices,getAllPricesForProduct } from "../controllers/product.controller.js";


const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/lowest", getLowestPrices);

// router.get("/lowestList", getAllPricesForProduct)
router.get("/prices/:name", getAllPricesForProduct); // !top to bottom!!

export default router;
