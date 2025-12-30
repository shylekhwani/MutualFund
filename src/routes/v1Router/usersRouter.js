import express from "express";
import {
  createUserController,
  getAllProfile,
} from "../../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllProfile);
userRouter.post("/create", createUserController);

export default userRouter;
