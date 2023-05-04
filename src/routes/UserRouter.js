import express from "express";
import { register, login, getUsers, getLoggedInUser} from "../controllers/UserController.js";
import { protect } from "../middleware/auth.js";

const UserRouter = express.Router();

UserRouter.get("/", getUsers);
 
UserRouter.post("/register", register);

UserRouter.post("/login", login);

UserRouter.get("/me", protect, getLoggedInUser);

export default UserRouter; 