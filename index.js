import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import ProductRouter from "./src/routes/ProductRouter.js";
import UserRouter from "./src/routes/UserRouter.js";

const app = express();
dotenv.config();
app.use(express.json());

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.use('/products', ProductRouter);
app.use('/users', UserRouter);

app.listen(5000, () => {
    console.log("Server is running on port ");
});

