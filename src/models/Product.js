import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    isFeatured: {
        type: Boolean,
    },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;