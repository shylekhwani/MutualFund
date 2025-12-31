import express from "express";
import {
  createUserController,
  getAllProfile,
  loginController,
} from "../../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllProfile);
userRouter.post("/create", createUserController);
userRouter.post("/login", loginController);

export default userRouter;
