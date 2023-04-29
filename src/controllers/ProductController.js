import Product from "../models/Product.js";

export const getProduct = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        next(err);
    }
}

export const getProductID = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.json(createdProduct);
    } catch (err) {
        next(err);
    }
}

export const updatedProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id);
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.imgUrl = req.body.imgUrl;
        product.quantity = req.body.quantity;
        product.isFeatured = req.body.isFeatured;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

