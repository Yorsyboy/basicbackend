import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
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
    isAvailable: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;