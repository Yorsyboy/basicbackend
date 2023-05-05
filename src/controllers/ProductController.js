import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const getProduct = asyncHandler(async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
})

export const getProductCreatedByUser = asyncHandler(async (req, res, next) => {
    try {
        const product = await Product.find({ user: req.user.id });
        res.json(product);
    } catch (err) {
        next(err);
    }
})

export const createProduct = asyncHandler(async (req, res, next) => {
    try {
        const product = new Product({
            user: req.user.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imgUrl: req.body.imgUrl,
            quantity: req.body.quantity,
            isAvailable: req.body.isAvailable,
        });
        const createdProduct = await product.save();
        res.json(createdProduct);
    } catch (err) {
        next(err);
    }
})

export const updatedProduct = asyncHandler(async (req, res, next) => {
    try {
        const findProduct = await Product.findById(req.params.id);
        if (!findProduct) {
            res.status(404);
            throw new Error("Product not found");
        }

        // check for user
        if (!req.user) {
            res.status(404);
            throw new Error("User not found");
        }

        // check if user is the owner of the product
        if (findProduct.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error("User not authorized");
        }

        const product = await Product.findByIdAndUpdate(req.params.id);

        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.imgUrl = req.body.imgUrl;
        product.quantity = req.body.quantity;
        product.isAvailable = req.body.isAvailable;
        
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
})

export const deleteProduct = asyncHandler(async (req, res, next) => {
    try {
        const findProduct = await Product.findById(req.params.id);
        if (!findProduct) {
            res.status(404);
            throw new Error("Product not found");
        }

        // check for user
        if (!req.user) {
            res.status(404);
            throw new Error("User not found");
        }

        // check if user is the owner of the product
        if (findProduct.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error("User not authorized");
        }
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch (err) {
        next(err);
    }
})

