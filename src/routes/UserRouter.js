import express from "express";
import { register, login, getLoggedInUser} from "../controllers/UserController.js";
import { protect } from "../middleware/auth.js";

const UserRouter = express.Router();
 
UserRouter.post("/register", register);

UserRouter.post("/login", login);

UserRouter.get("/loggedUser", protect, getLoggedInUser);

export default UserRouter; 