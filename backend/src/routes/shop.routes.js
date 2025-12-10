import express from "express";
import { createShop, getShops } from "../controllers/shop.controller.js";

const router = express.Router();

router.post("/", createShop);
router.get("/", getShops);

//wowowowowowowowowowowowowowowowowowoowowowowowowowowowowow so delete this line in future!!!!
//wow man!!!
export default router;
