import express from "express";
import { getProduct, getProductCreatedByUser, createProduct, updatedProduct, deleteProduct } from "../controllers/ProductController.js";
import { protect } from "../middleware/auth.js";

const ProductRouter = express.Router();

ProductRouter.get("/", getProduct);

ProductRouter.get("/:id", protect, getProductCreatedByUser);

ProductRouter.post("/", protect, createProduct);

ProductRouter.put("/:id", protect, updatedProduct);

ProductRouter.delete("/:", protect, deleteProduct);

export default ProductRouter;