import express from "express";
import { connectDB } from "./src/config/db.js";
import dotenv from 'dotenv'
import ProductRouter from "./src/routes/ProductRouter.js";
import UserRouter from "./src/routes/UserRouter.js";
import cors from 'cors'
import {errorHandler} from "./src/middleware/errorMiddleware.js";


connectDB();
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json({ limit: "50mb"}));
app.use(express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 }));


app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use(errorHandler);
app.use(cors());

app.listen(port, () => {
    console.log("Server is running on port ");
});
