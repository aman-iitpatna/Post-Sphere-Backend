import { Router } from "express";
import { registerUser, loginUser, updateFullName, userdata} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/userdata/:id").get(userdata);

userRouter.route("/updatefullname").patch(updateFullName);

export default userRouter;