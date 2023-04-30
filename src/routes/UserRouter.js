import express from "express";
import { register, login, getUsers } from "../controllers/UserController.js";
import {isAdmin} from "../controllers/middleware.js"

const UserRouter = express.Router();

UserRouter.get("/", getUsers);

UserRouter.post("/register", register);

UserRouter.post("/login", login);

export default UserRouter;