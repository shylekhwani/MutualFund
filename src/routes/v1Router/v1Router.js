import express from "express";
import userRouter from "./usersRouter.js";
import fundRouter from "./mutualFundRouter.js";

const v1Router = express.Router();

v1Router.use("/users", userRouter);
v1Router.use("/funds", fundRouter);

export default v1Router;
