import express from "express";
import { getProduct, getProductID, createProduct, updatedProduct, deleteProduct } from "../controllers/ProductController.js";
import {isLoggedIn, isAdmin} from "../controllers/middleware.js"

const ProductRouter = express.Router();

ProductRouter.get("/", isLoggedIn, getProduct);

ProductRouter.get("/:id", isLoggedIn, getProductID);

ProductRouter.post("/", isLoggedIn, createProduct);

ProductRouter.put("/:id", isLoggedIn,updatedProduct);

ProductRouter.delete("/:id", isAdmin, deleteProduct);

export default ProductRouter;