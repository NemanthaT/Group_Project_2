// server/routes/productRoutes.js
import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);        // /products?category=Textiles&limit=12
router.get("/:id", getProductById);  // /products/123

export default router;
